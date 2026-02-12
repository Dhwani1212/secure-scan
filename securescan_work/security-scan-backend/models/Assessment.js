const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    domain: {
        type: String,
        trim: true,
        default: null,
    },
    responses: {
        type: Map,
        of: String, // questionId -> optionKey (e.g., "1" -> "A")
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

AssessmentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Assessment", AssessmentSchema);
