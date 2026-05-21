import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    logo: { type: String },
    about: { type: String },
    website: { type: String }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);