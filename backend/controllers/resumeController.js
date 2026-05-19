import Resume from '../models/Resume.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { parseResume, matchResumeJD, getFullAnalysis } from '../services/aiProxyService.js';

// Helper to upload buffer to Cloudinary
const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: 'hireiq_resumes', format: 'pdf' },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};

// @desc    Upload PDF, parse text, extract skills, save to DB
// @route   POST /api/resume/upload
export const uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, data: null, message: 'Please upload a file' });
        }

        // 1. Send to AI Service to parse text and extract skills
        const parsedData = await parseResume(req.file.buffer, req.file.originalname);
        
        // 2. Upload to Cloudinary
        const cloudResult = await streamUpload(req);

        // 3. Save or update DB
        let resume = await Resume.findOne({ userId: req.user.id });
        
        if (resume) {
            // Update existing
            resume.fileUrl = cloudResult.secure_url;
            resume.fileName = req.file.originalname;
            resume.rawText = parsedData.text;
            resume.extractedSkills = parsedData.skills;
            await resume.save();
        } else {
            // Create new
            resume = await Resume.create({
                userId: req.user.id,
                fileUrl: cloudResult.secure_url,
                fileName: req.file.originalname,
                rawText: parsedData.text,
                extractedSkills: parsedData.skills
            });
        }

        res.status(200).json({ success: true, data: resume, message: 'Resume uploaded and parsed' });
    } catch (error) {
        next(error);
    }
};

// @desc    Analyze uploaded resume against a JD
// @route   POST /api/resume/analyze
export const analyzeWithJD = async (req, res, next) => {
    try {
        const { jdText } = req.body;
        if (!jdText) return res.status(400).json({ success: false, data: null, message: 'Job Description is required' });

        const resume = await Resume.findOne({ userId: req.user.id });
        if (!resume) return res.status(404).json({ success: false, data: null, message: 'Please upload a resume first' });

        // 1. Get Match Score (Fast)
        const matchData = await matchResumeJD(resume.rawText, jdText);

        // 2. Get Full Analysis from LLM (Takes a few seconds)
        const analysisData = await getFullAnalysis(resume.rawText, jdText);

        // 3. Save to History
        const analysisRecord = {
            jdText,
            score: matchData.score,
            analysis: { ...analysisData, matched_skills: matchData.matched_skills }
        };

        resume.analysisHistory.push(analysisRecord);
        await resume.save();

        res.status(200).json({ success: true, data: analysisRecord, message: 'Analysis complete' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's current resume
// @route   GET /api/resume/me
export const getMyResume = async (req, res, next) => {
    try {
        const resume = await Resume.findOne({ userId: req.user.id });
        res.status(200).json({ success: true, data: resume, message: 'Resume fetched' });
    } catch (error) {
        next(error);
    }
};