import Job from '../models/Job.js';
import Application from '../models/Application.js';
import ScreeningSession from '../models/ScreeningSession.js';

// @desc    Get top trending skills across posted jobs
// @route   GET /api/analytics/skills/trending
export const getSkillTrends = async (req, res, next) => {
    try {
        const { domain } = req.query;
        let matchStage = { isActive: true };
        if (domain && domain !== 'All') matchStage.domain = domain;

        const skills = await Job.aggregate([
            { $match: matchStage },
            { $unwind: '$skills' },
            { $group: { _id: { $toLower: '$skills' }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 15 },
            { $project: { skill: '$_id', count: 1, _id: 0 } }
        ]);

        res.status(200).json({ success: true, data: skills });
    } catch (error) {
        next(error);
    }
};

// @desc    Get candidate's application funnel stats
// @route   GET /api/analytics/candidate/funnel
export const getApplicationFunnel = async (req, res, next) => {
    try {
        const funnel = await Application.aggregate([
            { $match: { candidateId: req.user._id } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        // Standardize the output format for Recharts
        const stages = ['saved', 'applied', 'screening', 'interview', 'offer', 'rejected'];
        const formattedFunnel = stages.map(stage => {
            const found = funnel.find(f => f._id === stage);
            return { name: stage.charAt(0).toUpperCase() + stage.slice(1), value: found ? found.count : 0 };
        });

        res.status(200).json({ success: true, data: formattedFunnel });
    } catch (error) {
        next(error);
    }
};

// @desc    Get candidate's match score history
// @route   GET /api/analytics/candidate/scores
export const getScoreTimeline = async (req, res, next) => {
    try {
        // Fetch from applications where a score exists, sorted chronologically
        const scores = await Application.find({ 
            candidateId: req.user._id, 
            matchScore: { $ne: null } 
        })
        .sort({ updatedAt: 1 })
        .populate('jobId', 'company title')
        .select('matchScore updatedAt jobId');

        const timeline = scores.map(s => ({
            date: new Date(s.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: Math.round(s.matchScore),
            company: s.jobId ? s.jobId.company : 'Unknown'
        }));

        res.status(200).json({ success: true, data: timeline });
    } catch (error) {
        next(error);
    }
};