// services/scoringServices.js
// Complete scoring engine - FIXED: score now represents SECURITY HEALTH (higher = better)

// Consolidate all findings into one clean array
function generateConsolidatedFindings(results) {
  if (!results) return [];

  const findings = [];

  if (Array.isArray(results.vulnerabilities)) {
    results.vulnerabilities.forEach(v => findings.push({
      severity: v.severity || "low",
      title: v.title || "Untitled Vulnerability",
      description: v.description || "No description"
    }));
  }

  if (Array.isArray(results.subdomains)) {
    results.subdomains.forEach(sd => findings.push({
      severity: "info",
      title: "Subdomain Found",
      description: sd
    }));
  }

  if (Array.isArray(results.openPorts)) {
    results.openPorts.forEach(p => findings.push({
      severity: p.port === 22 ? "medium" : "info",
      title: `Open Port: ${p.port}`,
      description: p.service || "Unknown service"
    }));
  }

  return findings;
}

// SCORE based on severity - FIXED: now returns SECURITY HEALTH score (higher = better)
// Starts at 100, deducts points for each vulnerability
function calculateScoreFromFindings(findings) {
  let deductions = 0;

  findings.forEach(f => {
    switch ((f.severity || "info").toLowerCase()) {
      case "critical": deductions += 25; break;
      case "high": deductions += 15; break;
      case "medium": deductions += 8; break;
      case "low": deductions += 3; break;
      case "info": deductions += 0; break;
      default: deductions += 1;
    }
  });

  // Score is 100 minus deductions, minimum 0
  const score = Math.max(0, 100 - deductions);
  return score;
}

// BACKWARD COMPATIBILITY (controller uses calculateScore(results))
function calculateScore(results) {
  return calculateScoreFromFindings(generateConsolidatedFindings(results));
}

// Convert score to Grade - FIXED: Higher score = Better grade
function getGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

module.exports = {
  calculateScore,
  calculateScoreFromFindings,
  generateConsolidatedFindings,
  getGrade
};
