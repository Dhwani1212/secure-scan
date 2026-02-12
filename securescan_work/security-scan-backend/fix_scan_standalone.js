const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const MONGODB_URI = 'mongodb://127.0.0.1:27017/security-scan';
const SCAN_ID = '697426c0929b184038b45efa';
const DOMAIN = 'testphp.vulnweb.com';
const RECONFTW_DIR = '/home/bhuvan/reconftw';

function isValidDomain(domain, targetDomain) {
    if (!domain || typeof domain !== 'string') return false;
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (domain.includes('---') || domain.includes('___') || domain.includes('|') || domain.includes('  ')) return false;
    if (domain.startsWith('{') || domain.startsWith('[')) return false;
    if (/^v\d+\.\d+\.\d+/.test(domain)) return false;

    const isValid = domainRegex.test(domain);
    if (!isValid) return false;

    if (targetDomain) {
        const lowerDomain = domain.toLowerCase().trim();
        const lowerTarget = targetDomain.toLowerCase().trim();
        if (lowerDomain !== lowerTarget && !lowerDomain.endsWith('.' + lowerTarget)) return false;
    }
    return true;
}

async function readFileSafe(filePath, targetDomain = null) {
    try {
        const { stdout } = await execPromise(`wsl cat "${filePath}"`);
        const lines = stdout.split("\n");
        return lines
            .map(l => l.trim())
            .filter(line => {
                if (!line) return false;
                const lowerPath = filePath.toLowerCase();
                if (lowerPath.includes("subdomain") || lowerPath.includes("subs_") || lowerPath.includes("passive_") || lowerPath.includes("psub")) {
                    return isValidDomain(line, targetDomain);
                }
                if (line.includes('---') || line.includes('___') || line.includes('|')) return false;
                return true;
            });
    } catch (err) { return []; }
}

async function findAndReadFiles(dir, patterns, targetDomain = null) {
    let results = [];
    try {
        const { stdout } = await execPromise(`wsl find "${dir}" -type f`);
        const allFiles = stdout.split("\n").map(l => l.trim()).filter(Boolean);

        for (const filePath of allFiles) {
            const isMatch = patterns.some(p => filePath.toLowerCase().includes(p.toLowerCase()));
            if (isMatch) {
                const content = await readFileSafe(filePath, targetDomain);
                results = results.concat(content);
            }
        }
    } catch (err) { }
    return [...new Set(results)];
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

function calculateScore(findings) {
    let deductions = 0;
    findings.forEach(f => {
        switch ((f.severity || "info").toLowerCase()) {
            case "critical": deductions += 25; break;
            case "high": deductions += 15; break;
            case "medium": deductions += 8; break;
            case "low": deductions += 3; break;
            default: deductions += 1;
        }
    });
    return Math.max(0, 100 - deductions);
}

function getGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
}

async function fixScan() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const ScanSchema = new mongoose.Schema({}, { strict: false });
        const Scan = mongoose.model('Scan', ScanSchema);

        const resultsDir = `${RECONFTW_DIR}/Recon/${DOMAIN}`;
        console.log(`Parsing from: ${resultsDir}`);

        const vulnerabilities = await findAndReadFiles(resultsDir, ["nuclei", "vuln", "cve", "fuzz", "broken"]);
        const subdomains = await findAndReadFiles(resultsDir, ["subdomain", "subs_", "all_subdomains", "passive_subs", "psub", "subwiz"], DOMAIN);
        const hosts = await findAndReadFiles(resultsDir, ["host", "alive", "live", "probed"]);
        const osint = await findAndReadFiles(resultsDir, ["osint", "whois", "domain_info", "emails", "metadata"]);
        const technologies = await findAndReadFiles(resultsDir, ["tech", "wappalyzer", "webanalyze"]);

        const results = { vulnerabilities, subdomains, hosts, osint, technologies, openPorts: [], webData: [] };
        console.log(`Found ${vulnerabilities.length} vulnerabilities`);

        const findings = normalizeFindings(vulnerabilities);
        const score = calculateScore(findings);
        const grade = getGrade(score);

        await Scan.findByIdAndUpdate(SCAN_ID, {
            results,
            findings,
            score,
            grade,
            status: 'completed',
            progressPct: 100
        });

        console.log(`Scan updated: Score=${score}, Grade=${grade}, Findings=${findings.length}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

fixScan();
