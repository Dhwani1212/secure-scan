const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");

// Get all security assessment questions
router.get("/questions", assessmentController.getQuestions);

// Submit a completed assessment
router.post("/submit", assessmentController.submitAssessment);

// List assessment history
router.get("/history", assessmentController.getAssessmentHistory);

// Get single assessment details
router.get("/:id", assessmentController.getAssessmentDetails);

module.exports = router;
