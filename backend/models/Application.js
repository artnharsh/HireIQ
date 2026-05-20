import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    status: {
        type: String,
        enum: ['saved', 'applied', 'screening', 'interview', 'offer', 'rejected'],
        default: 'saved'
    },
    matchScore: { type: Number }, // Snapshot at time of application
    notes: { type: String },
    appliedAt: { type: Date, default: Date.now },
    resumeVersion: { type: Number, default: 1 },
}, { timestamps: true });

// Prevent duplicate applications
applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);