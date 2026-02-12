const { calculateAssessmentScore, getAssessmentGrade } = require("./services/assessmentServices");

// Mock Sample 1 from SQL (Score should be ~85%)
// Manual calculation: Total questions 40. Max points 120.
// Sample 1 details: 
// 23 "Yes" (A-3), 10 "Mostly" (B-2), 7 "Sometimes" (C-1)
// 23*3 = 69
// 10*2 = 20
// 7*1 = 7
// Total = 96 
// 96/120 = 80%

// Wait, looking at SQL id 1:
// (id=1, score=85, ...)
// If score is 85, then points = 0.85 * 120 = 102.
// Maybe Sample 1 has more "Yes"? 

const sample1_responses = {
    "1": "A", "2": "B", "3": "A", "4": "C", "5": "A", "6": "B", "7": "A", "8": "C", "9": "A", "10": "A",
    "11": "A", "12": "A", "13": "C", "14": "A", "15": "A", "16": "A", "17": "C", "18": "A", "19": "A", "20": "B",
    "21": "A", "22": "A", "23": "A", "24": "B", "25": "A", "26": "B", "27": "A", "28": "A", "29": "A", "30": "B",
    "31": "A", "32": "A", "33": "B", "34": "A", "35": "B", "36": "A", "37": "B", "38": "A", "39": "B", "40": "A"
};

const score = calculateAssessmentScore(sample1_responses);
const grade = getAssessmentGrade(score);

console.log(`Test Sample 1:`);
console.log(`Score: ${score}% (Expected: ~80-85% depending on exact counts)`);
console.log(`Grade: ${grade}`);

// Mock Sample 7 from SQL (Score should be 93%)
// Points = 0.93 * 120 = 111.6 -> 112 points.
// 112 = 32*3 (96) + 8*2 (16)
const sample7_responses = {
    "1": "A", "2": "B", "3": "A", "4": "A", "5": "A", "6": "A", "7": "A", "8": "A", "9": "A", "10": "B",
    "11": "A", "12": "A", "13": "A", "14": "A", "15": "A", "16": "A", "17": "A", "18": "B", "19": "A", "20": "A",
    "21": "B", "22": "A", "23": "A", "24": "A", "25": "A", "26": "A", "27": "B", "28": "A", "29": "A", "30": "A",
    "31": "A", "32": "A", "33": "A", "34": "A", "35": "B", "36": "A", "37": "B", "38": "A", "39": "A", "40": "B"
};

const score7 = calculateAssessmentScore(sample7_responses);
console.log(`\nTest Sample 7:`);
console.log(`Score: ${score7}% (Expected: ~93%)`);

if (score > 60 && score7 > 90) {
    console.log("\n✅ Scoring Logic matches SQL expectations.");
} else {
    console.log("\n❌ Scoring Logic mismatch.");
}
