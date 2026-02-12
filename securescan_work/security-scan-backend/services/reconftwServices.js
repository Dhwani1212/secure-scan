const { spawn, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const Scan = require("../models/Scan");
const scoringService = require("./scoringServices");

/* ============================
   CONSTANTS
============================ */

const RECONFTW_DIR = process.env.RECONFTW_DIR;
const RECONFTW_SAFE_BIN = process.env.RECONFTW_SAFE_BIN;
const SAFE_OUTPUT_BASE = process.env.SAFE_OUTPUT_BASE;

const IS_WINDOWS = os.platform() === "win32";

/* ============================
   HELPERS
============================ */

function toWindowsPath(linuxPath) {
  if (!IS_WINDOWS || !linuxPath) return linuxPath;
  // If it starts with /home, /var, etc. (absolute Linux path)
  if (linuxPath.startsWith("/")) {
    return `\\\\wsl.localhost\\Ubuntu${linuxPath.replace(/\//g, "\\")}`;
  }
  return linuxPath;
}

function sanitizeDomain(domain) {
  return domain.toLowerCase().trim().replace(/[^a-z0-9.-]/g, "");
}

function isBlockedTarget(target) {
  if (!target) return true;

  const blocked = ["localhost", "127.0.0.1", "::1"];
  if (blocked.includes(target)) return true;

  if (/^10\./.test(target)) return true;
  if (/^192\.168\./.test(target)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(target)) return true;

  return false;
}

function isValidDomain(domain, targetDomain) {
  if (!domain || typeof domain !== 'string') return false;
  // Basic domain regex - must have at least one dot and only valid characters
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
  // Also filter based on some blacklisted indicators of garbage
  if (domain.includes('---') || domain.includes('___') || domain.includes('|') || domain.includes('  ')) return false;
  if (domain.startsWith('{') || domain.startsWith('[')) return false;
  if (/^v\d+\.\d+\.\d+/.test(domain)) return false;

  const isValid = domainRegex.test(domain);
  if (!isValid) return false;

  // Stricter check: it MUST be a subdomain of the target or the target itself
  if (targetDomain) {
    const lowerDomain = domain.toLowerCase().trim();
    const lowerTarget = targetDomain.toLowerCase().trim();
    // Match subdomain.target.com or target.com
    if (lowerDomain !== lowerTarget && !lowerDomain.endsWith('.' + lowerTarget)) return false;
  }

  return true;
}

async function setScanStatus(scanId, patch) {
  try {
    await Scan.findByIdAndUpdate(scanId, patch);
  } catch (err) {
    console.error(`Failed to update scan status for ${scanId}:`, err.message);
  }
}

function normalizeFindings(vulns = []) {
  return vulns.map((line, index) => ({
    id: index + 1,
    title: line.slice(0, 120),
    severity: line.toLowerCase().includes("critical")
      ? "critical"
      : line.toLowerCase().includes("high")
        ? "high"
        : line.toLowerCase().includes("medium")
          ? "medium"
          : "low",
    raw: line
  }));
}

const util = require("util");
const execPromise = util.promisify(exec);

/* ============================
   PARSE RESULTS (CROSS-PLATFORM)
   - Uses 'wsl' commands for reliability on Windows
============================ */

async function readFileSafe(filePath, targetDomain = null) {
  try {
    let lines = [];
    if (IS_WINDOWS) {
      // Robust way to read WSL files from Windows without UNC path headaches
      const { stdout } = await execPromise(`wsl cat "${filePath}"`);
      lines = stdout.split("\n");
    } else {
      if (fs.existsSync(filePath)) {
        lines = fs.readFileSync(filePath, "utf8").split("\n");
      }
    }

    // Filter lines to ensure only valid data (especially for subdomains)
    return lines
      .map(l => l.trim())
      .filter(line => {
        if (!line) return false;

        // If the file path suggests it's a subdomain file, apply domain validation
        const lowerPath = filePath.toLowerCase();
        if (lowerPath.includes("subdomain") || lowerPath.includes("subs_") || lowerPath.includes("passive_") || lowerPath.includes("psub")) {
          return isValidDomain(line, targetDomain);
        }

        // Basic noise filtering for other files
        if (line.includes('---') || line.includes('___') || line.includes('|')) return false;
        if (line.startsWith('{') || line.startsWith('[')) {
          // Keep if it looks like actual JSON result, but skip if it's a tool banner block
          if (line.includes('"host"') || line.includes('"cve"')) return true;
          return false;
        }

        return true;
      });
  } catch (err) {
    // Only log if it's not a "file not found" error
    if (!err.message.includes("No such file")) {
      console.error(`Error reading file ${filePath}:`, err.message);
    }
  }
  return [];
}

/**
 * Recursively find and read contents of files matching patterns
 */
async function findAndReadFiles(dir, patterns, targetDomain = null) {
  let results = [];
  try {
    const allFiles = [];
    if (IS_WINDOWS) {
      // Use WSL 'find' to get all files in the directory
      const { stdout } = await execPromise(`wsl find "${dir}" -type f`);
      allFiles.push(...stdout.split("\n").map(l => l.trim()).filter(Boolean));
    } else {
      if (!fs.existsSync(dir)) return results;
      const getFilesRecursively = (d) => {
        const files = fs.readdirSync(d);
        for (const file of files) {
          const fullPath = path.join(d, file).replace(/\\/g, "/");
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            getFilesRecursively(fullPath);
          } else {
            allFiles.push(fullPath);
          }
        }
      };
      getFilesRecursively(dir);
    }

    for (const filePath of allFiles) {
      // Match against the FULL path so folder names like 'nuclei_output' help match subfiles
      const isMatch = patterns.some(p => filePath.toLowerCase().includes(p.toLowerCase()));
      if (isMatch) {
        const content = await readFileSafe(filePath, targetDomain);
        results = results.concat(content);
      }
    }
  } catch (err) {
    if (!err.message.includes("No such file")) {
      console.error(`Error finding files in ${dir}:`, err.message);
    }
  }
  return [...new Set(results)]; // De-duplicate
}

async function parseResultsFromPath(base, domain = "") {
  fs.appendFileSync('debug_parser.log', `\n--- NEW PARSE ---\nBase: ${base}, Domain: ${domain}\n`);

  // ReconFTW stores results in its internal Recon folder, not in the output path
  const reconFtwReconDir = `${RECONFTW_DIR}/Recon`;

  // Try to find the domain-specific folder or use "Multi" for web scans
  let resultsDir = base;

  // Check if reconftw Recon folder has data for this domain specifically
  try {
    if (IS_WINDOWS) {
      // Find the specific domain folder in the Recon directory
      const domainFolder = base.split('/').pop().split('_').pop(); // Brittle, let's try something better
      // Better: The domain is usually in the path or we can find it. 
      // Actually, let's just list all folders and see if any match the domain we are scanning.
      const { stdout } = await execPromise(`wsl ls "${reconFtwReconDir}" 2>/dev/null`);
      const folders = stdout.split("\n").map(l => l.trim()).filter(Boolean);

      // Try to find a folder that matches the domain name
      if (folders.length > 0) {
        // 1. Exact match with domain
        if (domain && folders.includes(domain)) {
          resultsDir = `${reconFtwReconDir}/${domain}`;
        }
        // 2. Partial match (if base or domain is in folders) 
        else {
          const domainMatch = folders.find(f => (domain && f.includes(domain)) || (domain && domain.includes(f)) || base.includes(f));
          if (domainMatch) {
            resultsDir = `${reconFtwReconDir}/${domainMatch}`;
          } else {
            resultsDir = `${reconFtwReconDir}/${folders[folders.length - 1]}`;
          }
        }
        console.log(`Found reconftw results in: ${resultsDir}`);
      }
    }
  } catch (err) {
    console.log(`Using original output path: ${base}`);
  }

  fs.appendFileSync('debug_parser.log', `Final resultsDir: ${resultsDir}\n`);

  // Parse all categories
  const subdomains = await findAndReadFiles(resultsDir, ["subdomain", "subs_", "all_subdomains", "passive_subs", "psub", "subwiz"], domain);
  const hosts = await findAndReadFiles(resultsDir, ["host", "alive", "live", "probed"]);
  const osint = await findAndReadFiles(resultsDir, ["osint", "whois", "domain_info", "emails", "metadata"]);
  const technologies = await findAndReadFiles(resultsDir, ["tech", "wappalyzer", "webanalyze"]);
  const vulnerabilities = await findAndReadFiles(resultsDir, ["nuclei", "vuln", "cve", "fuzz", "broken"]);

  fs.appendFileSync('debug_parser.log', `Vulns found: ${vulnerabilities.length}\n`);
  fs.appendFileSync('debug_parser.log', `Subs found: ${subdomains.length}\n`);

  // Web Data: Parse fuzzing results (ffuf JSON files)
  let webData = [];
  try {
    if (IS_WINDOWS) {
      const fuzzDir = `${resultsDir}/.tmp/fuzzing`;
      const { stdout: fuzzFiles } = await execPromise(`wsl find "${fuzzDir}" -name "*.json" 2>/dev/null`).catch(() => ({ stdout: "" }));

      for (const jsonFile of fuzzFiles.split("\n").filter(Boolean)) {
        try {
          const { stdout: jsonContent } = await execPromise(`wsl cat "${jsonFile.trim()}" 2>/dev/null`);
          const fuzzData = JSON.parse(jsonContent);
          if (fuzzData.results && Array.isArray(fuzzData.results)) {
            webData = webData.concat(fuzzData.results.map(r => ({
              url: r.url,
              status: r.status,
              length: r.length,
              words: r.words,
              contentType: r["content-type"] || ""
            })));
          }
        } catch (parseErr) {
          console.log(`Could not parse fuzzing file: ${jsonFile}`);
        }
      }
    }
  } catch (err) {
    console.log("No fuzzing results found");
  }

  // Also check for directory listing files
  const dirListings = await findAndReadFiles(resultsDir, ["fuzzing", "fuzz_", "dirsearch", "ffuf"]);

  // Combine web data from text files
  if (dirListings.length > 0) {
    webData = webData.concat(dirListings.map(line => {
      const parts = line.split(" ");
      return {
        url: parts[parts.length - 1] || line,
        status: parseInt(parts[0]) || 200,
        raw: line
      };
    }).filter(d => d.url && d.url.startsWith("http")));
  }

  // Open Ports Parsing
  let openPorts = [];
  try {
    const nmapFiles = await findAndReadFiles(resultsDir, ["nmap", "ports", "portscan"]);
    openPorts = nmapFiles
      .map(r => {
        const m = r.match(/(\d+)\/tcp\s+open\s+(\S+)/);
        return m ? { port: Number(m[1]), service: m[2] } : null;
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Error parsing open ports:", err.message);
  }

  console.log(`Parsed results - Vulns: ${vulnerabilities.length}, Subs: ${subdomains.length}, Hosts: ${hosts.length}, WebData: ${webData.length}, Ports: ${openPorts.length}`);

  return { vulnerabilities, subdomains, hosts, osint, technologies, openPorts, webData };
}


/* ============================
   STOP SCAN
============================ */

async function stopScan(scanId) {
  const scan = await Scan.findById(scanId);
  if (!scan) return false;

  const pgid = scan.pgid || scan.pid;
  if (!pgid) return false;

  try {
    if (IS_WINDOWS) {
      // On Windows, if running via WSL, we might need a different approach
      // For now, try to kill the process tree
      exec(`taskkill /pid ${pgid} /T /F`);
    } else {
      // Kill entire process group on Linux
      process.kill(-pgid, "SIGTERM");
      setTimeout(() => {
        try {
          process.kill(-pgid, "SIGKILL");
        } catch { }
      }, 5000);
    }

    await setScanStatus(scanId, {
      status: "stopped",
      completedAt: new Date(),
      currentModule: null,
      pid: null,
      pgid: null
    });

    return true;
  } catch (err) {
    console.error("Failed to stop scan:", err.message);
    throw new Error("Failed to stop scan: " + err.message);
  }
}


/* ============================
   START SCAN
============================ */

async function scanDomain(domain, scanId, mode = "full") {
  if (isBlockedTarget(domain)) {
    await setScanStatus(scanId, {
      status: "failed",
      error: "Localhost or private IP targets are not allowed"
    });
    return;
  }

  const scanIdStr = scanId.toString();
  const cleanDomain = sanitizeDomain(domain);

  // 🐧 LINUX PATHS (For usage INSIDE WSL)
  // Use forward slashes exclusively so bash doesn't trip
  const safeOutput = `${SAFE_OUTPUT_BASE}/${scanIdStr}`.replace(/\/+/g, "/");
  const targetFile = `${safeOutput}/targets.txt`;
  const logFile = `${safeOutput}/recon.log`;

  // 🪟 WINDOWS PATHS (For Node.js filesystem access)
  const winOutput = toWindowsPath(safeOutput);

  // Ensure output directory exists (Node.js native)
  try {
    if (!fs.existsSync(winOutput)) {
      console.log(`Creating output directory: ${winOutput}`);
      fs.mkdirSync(winOutput, { recursive: true });
    }
  } catch (err) {
    console.error(`Failed to create directory ${winOutput}:`, err.message);
  }

  await setScanStatus(scanId, {
    status: "running",
    startedAt: new Date(),
    progressPct: 5,
    currentModule: "Initializing ReconFTW",
    outputPath: safeOutput, // Keep original Linux path in DB
    logFile
  });

  let command = "";
  const baseCmd = RECONFTW_SAFE_BIN;

  switch (mode) {
    case "passive":
      command = `"${baseCmd}" -d ${cleanDomain} -p -o "${safeOutput}"`;
      break;
    case "subdomain":
      command = `"${baseCmd}" -d ${cleanDomain} -s -o "${safeOutput}"`;
      break;
    case "web":
      // Handle target file creation within the command for atomicity in shell
      command = `echo "http://${cleanDomain}" > "${targetFile}" && "${baseCmd}" -l "${targetFile}" -w -o "${safeOutput}"`;
      break;
    case "full":
    default:
      command = `"${baseCmd}" -d ${cleanDomain} -a -o "${safeOutput}"`;
  }

  const startTime = Date.now();

  const spawnCmd = IS_WINDOWS ? "wsl" : "bash";
  const spawnArgs = IS_WINDOWS
    ? ["bash", "-lc", `cd "${RECONFTW_DIR}" && (${command}) > "${logFile}" 2>&1`]
    : ["-lc", `cd "${RECONFTW_DIR}" && (${command}) > "${logFile}" 2>&1`];

  console.log(`Launching scan: ${spawnCmd} ${spawnArgs.join(" ")}`);

  const proc = spawn(spawnCmd, spawnArgs, {
    detached: !IS_WINDOWS, // Detached doesn't work the same on Windows
    stdio: "ignore"
  });

  if (proc.pid) {
    await setScanStatus(scanId, {
      pid: proc.pid,
      pgid: IS_WINDOWS ? null : proc.pid // PGID only relevant on Linux
    });
  }

  proc.on("error", async (err) => {
    console.error(`Spawn error for scan ${scanId}:`, err);
    await setScanStatus(scanId, {
      status: "failed",
      error: `Failed to launch scan: ${err.message}`,
      completedAt: new Date()
    });
  });

  proc.on("close", async (code) => {
    const duration = (Date.now() - startTime) / 1000;
    console.log(`Scan process for ${scanId} closed with code ${code} after ${duration}s`);

    const latest = await Scan.findById(scanId);
    if (!latest || latest.status === "stopped") return;

    // Small delay to ensure files are flushed to disk
    await new Promise(r => setTimeout(r, 2000));

    console.log(`Parsing results for scan ${scanId}...`);
    const results = await parseResultsFromPath(safeOutput, latest.domain);

    const findings = normalizeFindings(results.vulnerabilities || []);
    const score = scoringService.calculateScore(results);
    const grade = scoringService.getGrade(score);

    await setScanStatus(scanId, {
      status: "completed",
      completedAt: new Date(),
      progressPct: 100,
      results,
      findings,
      score,
      grade,
      currentModule: null
    });
  });
}

/**
 * Create a ZIP archive of the scan results
 */
async function createExportZip(scanId, domain) {
  if (!scanId || !domain) {
    throw new Error("scanId and domain are required for export");
  }

  const resultsDir = `${RECONFTW_DIR}/Recon/${domain}`;
  const zipName = `scan_results_${scanId}.zip`;
  const zipPathLinux = `/tmp/${zipName}`;
  const zipPathWindows = path.join(os.tmpdir(), zipName);

  try {
    if (IS_WINDOWS) {
      // 1. Create ZIP in WSL /tmp
      await execPromise(`wsl zip -r "${zipPathLinux}" "${resultsDir}"`);

      // 2. Determine WSL distribution name (defaulting to Ubuntu if not found)
      // Usually it's Ubuntu, but we can try to be safe.
      // For this specific setup, we know it's Ubuntu based on previous paths.
      const wslPath = `\\\\wsl.localhost\\Ubuntu${zipPathLinux.replace(/\//g, "\\")}`;

      // 3. Copy to Windows temp
      if (fs.existsSync(wslPath)) {
        fs.copyFileSync(wslPath, zipPathWindows);
        // Clean up WSL temp
        exec(`wsl rm "${zipPathLinux}"`);
        return zipPathWindows;
      } else {
        throw new Error("Failed to locate ZIP file in WSL");
      }
    } else {
      // Linux implementation
      await execPromise(`zip -r "${zipPathLinux}" "${resultsDir}"`);
      return zipPathLinux;
    }
  } catch (err) {
    console.error("createExportZip error:", err);
    throw err;
  }
}

module.exports = {
  scanDomain,
  stopScan,
  parseResultsFromPath,
  createExportZip
};
