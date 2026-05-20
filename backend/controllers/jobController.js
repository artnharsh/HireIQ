import Job from '../models/Job.js';

// @desc    Get all jobs with filtering, search, and pagination
// @route   GET /api/jobs
export const getJobs = async (req, res, next) => {
    try {
        const { type, experience, domain, workMode, search, page = 1, limit = 10 } = req.query;
        let query = { isActive: true };

        // Full-text search
        if (search) {
            query.$text = { $search: search };
        }

        // Array matching for multi-select checkboxes (e.g., type=full-time,internship)
        if (type) query.type = { $in: type.split(',') };
        if (experience) query.experienceLevel = { $in: experience.split(',') };
        if (domain) query.domain = { $in: domain.split(',') };
        if (workMode) query['location.type'] = { $in: workMode.split(',') };

        // Pagination calculations
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Job.countDocuments(query);

        const jobs = await Job.find(query)
            .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        res.status(200).json({
            success: true,
            data: jobs,
            pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
            message: 'Jobs fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Post a new job (Recruiters Only)
// @route   POST /api/jobs
export const postJob = async (req, res, next) => {
    try {
        const jobData = { ...req.body, postedBy: req.user.id };
        const job = await Job.create(jobData);
        
        res.status(201).json({ success: true, data: job, message: 'Job posted successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Seed Dummy Jobs (Dev Utility)
// @route   POST /api/jobs/seed
export const seedJobs = async (req, res, next) => {
    try {
        // We will hit this later to populate your feed instantly
        res.status(200).json({ success: true, message: 'Seeder ready' });
    } catch (error) {
        next(error);
    }
};