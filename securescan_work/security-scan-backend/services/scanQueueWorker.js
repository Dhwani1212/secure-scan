const Scan = require("../models/Scan");
const reconftwService = require("./reconftwServices");

let workerRunning = false;
const COOLDOWN_MS = 10 * 1000; // Reduced to 10s for better responsiveness, or keep higher if needed
const CONCURRENCY_LIMIT = parseInt(process.env.SCAN_CONCURRENCY_LIMIT || "2");
const POLL_INTERVAL_MS = 5000;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runQueueWorker() {
  if (workerRunning) return;
  workerRunning = true;

  console.log(`[QueueWorker] Started with concurrency limit: ${CONCURRENCY_LIMIT}`);

  while (true) {
    try {
      // 1. Check how many scans are currently running
      const runningCount = await Scan.countDocuments({ status: "running" });

      if (runningCount >= CONCURRENCY_LIMIT) {
        // Limit reached, wait and check again
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      // 2. We have capacity! Calculate how many more we can take
      const capacity = CONCURRENCY_LIMIT - runningCount;

      // 3. Get the next N pending scans
      const nextScans = await Scan.find({ status: "pending" })
        .sort({ createdAt: 1 })
        .limit(capacity);

      if (nextScans.length === 0) {
        // No pending scans, wait and check again
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      // 4. Start each scan asynchronously
      // We don't await reconftwService.scanDomain here because it's its own async process
      // the worker loop will check the 'running' count in the next iteration.
      for (const scan of nextScans) {
        console.log(`[QueueWorker] Dispatching scan for ${scan.domain} (${scan._id})`);

        // Mark as running early to prevent double-pickup in the same loop or next poll
        // Although scanDomain sets it to running, we do it here synchronously for safety
        await Scan.findByIdAndUpdate(scan._id, { status: "running", startedAt: new Date() });

        reconftwService.scanDomain(
          scan.domain,
          scan._id,
          scan.mode
        );
      }

      // 5. Short sleep before next capacity check
      await sleep(2000);

    } catch (err) {
      console.error("[QueueWorker] Error in loop:", err);
      await sleep(10000); // Wait longer on error
    }
  }
}

module.exports = { runQueueWorker };
