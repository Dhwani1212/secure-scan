const Assessment = require("../models/Assessment");
const assessmentQuestions = require("../config/assessmentQuestions.json");
const { calculateAssessmentScore, getAssessmentGrade } = require("../services/assessmentServices");

/**
 * GET /api/assessments/questions
 * Returns all categories and questions
 */
exports.getQuestions = (req, res) => {
    try {
        return res.json(assessmentQuestions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * POST /api/assessments/submit
 * Submits assessment and calculates score
 */
exports.submitAssessment = async (req, res) => {
    try {
        const { responses, domain, userId } = req.body;

        if (!responses || typeof responses !== "object") {
            return res.status(400).json({ message: "Invalid responses format" });
        }

        const score = calculateAssessmentScore(responses);
        const grade = getAssessmentGrade(score);

        const assessment = new Assessment({
            userId: userId || null,
            domain: domain || null,
            responses,
            score,
            grade,
            createdAt: new Date(),
        });

        await assessment.save();

        return res.status(201).json({
            success: true,
            assessmentId: assessment._id,
            score,
            grade,
        });
    } catch (error) {
        console.error("submitAssessment error:", error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/assessments/history
 * Returns list of past assessments
 */
exports.getAssessmentHistory = async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { userId } : {};

        const assessments = await Assessment.find(filter).sort({ createdAt: -1 });
        return res.json(assessments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/assessments/:id
 * Returns detailed assessment report
 */
exports.getAssessmentDetails = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }
        return res.json(assessment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
