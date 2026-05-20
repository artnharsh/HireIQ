import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    responsibilities: { type: String, required: true },
    type: { type: String, enum: ['internship', 'full-time', 'part-time', 'contract'], index: true },
    experienceLevel: { type: String, enum: ['fresher', '0-1', '1-3', '3-5', '5+'], index: true },
    domain: { type: String, index: true },
    location: {
        type: { type: String, enum: ['remote', 'hybrid', 'onsite'], required: true },
        city: { type: String }
    },
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'INR' }
    },
    skills: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deadline: { type: Date },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Text index for fast searching across title and company
jobSchema.index({ title: 'text', company: 'text', domain: 'text' });

export default mongoose.model('Job', jobSchema);