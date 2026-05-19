import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    rawText: { type: String, required: true },
    extractedSkills: [{ type: String }],
    analysisHistory: [{
        jdText: String,
        score: Number,
        analysis: Object, // Stores the full JSON response from Groq
        analyzedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);