import Job from '../models/Job.js';

// @desc    Get all jobs with filtering, search, and pagination
// @route   GET /api/jobs
export const getJobs = async (req, res, next) => {
    try {
        const { type, experience, domain, workMode, search, salary_min, salary_max, datePosted, page = 1, limit = 10 } = req.query;
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

        if (salary_min || salary_max) {
            if (salary_min) query['salary.min'] = { $gte: Number(salary_min) };
            if (salary_max) query['salary.max'] = { $lte: Number(salary_max) };
        }

        if (datePosted) {
            const date = new Date();
            if (datePosted === 'Past 24 hours') date.setDate(date.getDate() - 1);
            else if (datePosted === 'Past week') date.setDate(date.getDate() - 7);
            else if (datePosted === 'Past month') date.setMonth(date.getMonth() - 1);

            query.createdAt = { $gte: date };
        }

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
        await Job.deleteMany({}); // Clear existing

        const sampleJobs = Array.from({ length: 20 }).map((_, i) => ({
            title: `Software Engineer Level ${Math.floor(Math.random() * 5) + 1}`,
            company: `TechCorp ${i}`,
            description: 'Sample description for a great software engineering role.',
            requirements: 'Node.js, React, MongoDB',
            responsibilities: 'Build features, fix bugs.',
            type: ['full-time', 'contract', 'internship'][Math.floor(Math.random() * 3)],
            experienceLevel: ['fresher', '0-1', '1-3', '3-5', '5+'][Math.floor(Math.random() * 5)],
            domain: 'Software Engineering',
            location: { 
                type: ['remote', 'hybrid', 'onsite'][Math.floor(Math.random() * 3)], 
                city: 'San Francisco' 
            },
            salary: { min: 80000, max: 150000, currency: 'USD' },
            skills: ['React', 'Node.js', 'MongoDB'],
            postedBy: req.user.id // Assigns to whoever clicked the seed button
        }));

        await Job.insertMany(sampleJobs);
        res.status(200).json({ success: true, message: '20 Sample Jobs Seeded Successfully' });
    } catch (error) {
        next(error);
    }
};
// @desc    Get single job by ID
// @route   GET /api/jobs/:id
export const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name company');
        if (!job) {
            return res.status(404).json({ success: false, data: null, message: 'Job not found' });
        }
        res.status(200).json({ success: true, data: job, message: 'Job fetched' });
    } catch (error) {
        next(error);
    }
};