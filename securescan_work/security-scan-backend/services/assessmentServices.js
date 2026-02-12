const questions = require("../config/assessmentQuestions.json");

/**
 * Calculate assessment score based on responses
 * @param {Object} responseMap - mapping of questionId (string) to optionKey (string)
 * @returns {Number} - percentage score 0-100
 */
function calculateAssessmentScore(responseMap) {
    let totalScore = 0;
    let maxPossibleScore = 0;

    questions.forEach((cat) => {
        cat.questions.forEach((q) => {
            maxPossibleScore += 3; // Each question max score is 3
            const selectedKey = responseMap[q.id.toString()];
            if (selectedKey) {
                const option = q.options.find((opt) => opt.key === selectedKey);
                if (option) {
                    totalScore += option.score;
                }
            }
        });
    });

    if (maxPossibleScore === 0) return 0;
    return Math.round((totalScore / maxPossibleScore) * 100);
}

/**
 * Get grade based on percentage score
 * @param {Number} score - 0-100
 * @returns {String} - A, B, C, or F
 */
function getAssessmentGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 60) return "C";
    return "F";
}

module.exports = {
    calculateAssessmentScore,
    getAssessmentGrade,
};
