import Application from '../models/Application.js';
import Resume from '../models/Resume.js';
import { generateCoverLetter } from '../services/aiProxyService.js';
import Job from '../models/Job.js';

// @desc    Create/Update Application Status (e.g., Save -> Apply)
// @route   POST /api/applications
export const applyToJob = async (req, res, next) => {
    try {
        const { jobId, status, matchScore } = req.body;
        
        // Upsert logic: Update if exists, create if not
        const application = await Application.findOneAndUpdate(
            { candidateId: req.user.id, jobId },
            { status, matchScore: matchScore || null },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ success: true, data: application, message: `Status updated to ${status}` });
    } catch (error) {
        next(error);
    }
};

// @desc    Get Candidate's Kanban Board Data
// @route   GET /api/applications/my
export const getMyApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ candidateId: req.user.id })
            .populate('jobId', 'title company location.type location.city type createdAt')
            .sort({ updatedAt: -1 });

        res.status(200).json({ success: true, data: applications, message: 'Applications fetched' });
    } catch (error) {
        next(error);
    }
};

// @desc    Generate Cover Letter
// @route   POST /api/applications/cover-letter
export const draftCoverLetter = async (req, res, next) => {
    try {
        const { jdText, company, role } = req.body;
        
        const resume = await Resume.findOne({ userId: req.user.id });
        if (!resume) return res.status(404).json({ success: false, data: null, message: 'Upload a resume first' });

        const result = await generateCoverLetter(resume.rawText, jdText, company, role);
        
        res.status(200).json({ success: true, data: result.cover_letter, message: 'Cover letter generated' });
    } catch (error) {
        next(error);
    }
};