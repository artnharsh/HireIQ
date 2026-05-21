import mongoose from 'mongoose';

const screeningSessionSchema = new mongoose.Schema({
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    jobTitle: { type: String, required: true },
    jdText: { type: String, required: true },
    results: [{
        filename: String,
        fileUrl: String,
        parsedText: String,
        score: Number,
        matchedSkills: [String],
        missingSkills: [String],
        explanation: String,
        cluster: { type: String, enum: ['strong', 'moderate', 'weak'] }
    }]
}, { timestamps: true });

export default mongoose.model('ScreeningSession', screeningSessionSchema);