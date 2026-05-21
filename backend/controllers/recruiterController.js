import ScreeningSession from '../models/ScreeningSession.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import { parseResume, rankBulkResumes } from '../services/aiProxyService.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { parse } from 'json2csv';

const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: 'hireiq_bulk_resumes', format: 'pdf' },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

// @desc    Upload up to 50 resumes, parse, rank, and cluster against a JD
// @route   POST /api/recruiter/bulk-screen
export const bulkScreenResumes = async (req, res, next) => {
    try {
        const { jdText, jobTitle } = req.body;
        const files = req.files; // Array of files from multer

        if (!files || files.length === 0) return res.status(400).json({ message: 'No resumes uploaded' });
        if (!jdText) return res.status(400).json({ message: 'JD text is required' });

        // 1. Process all files concurrently (Upload to Cloudinary + Extract Text via Python)
        const processPromises = files.map(async (file) => {
            // Upload to Cloudinary to get a permanent URL
            const cloudUpload = streamUpload(file.buffer);
            
            // Send buffer to Python to extract raw text
            const textExtraction = parseResume(file.buffer, file.originalname);
            
            const [cloudResult, parsedData] = await Promise.all([cloudUpload, textExtraction]);
            
            return {
                id: cloudResult.secure_url, // Using URL as unique ID for the Python engine
                filename: file.originalname,
                text: parsedData.text,
                fileUrl: cloudResult.secure_url
            };
        });

        const extractedResumes = await Promise.all(processPromises);

        // 2. Send the extracted text arrays to Python for AI Ranking & Clustering
        const rankPayload = extractedResumes.map(r => ({ id: r.id, text: r.text, filename: r.filename }));
        const aiRanking = await rankBulkResumes(jdText, rankPayload);

        // 3. Map the AI results back to our DB schema
        const finalResults = aiRanking.ranked.map(aiResult => {
            const originalData = extractedResumes.find(r => r.id === aiResult.id);
            
            // Determine cluster
            let cluster = 'weak';
            if (aiResult.score >= 70) cluster = 'strong';
            else if (aiResult.score >= 40) cluster = 'moderate';

            return {
                filename: aiResult.filename,
                fileUrl: originalData.fileUrl,
                parsedText: originalData.text,
                score: aiResult.score,
                matchedSkills: aiResult.matched_skills,
                missingSkills: aiResult.missing_skills,
                explanation: aiResult.explanation,
                cluster: cluster
            };
        });

        // 4. Save Screening Session
        const session = await ScreeningSession.create({
            recruiterId: req.user.id,
            jobTitle: jobTitle || 'Untitled Session',
            jdText: jdText,
            results: finalResults
        });

        res.status(200).json({ success: true, data: session, message: 'Screening complete' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all screening sessions for recruiter
// @route   GET /api/recruiter/sessions
export const getScreeningSessions = async (req, res, next) => {
    try {
        const sessions = await ScreeningSession.find({ recruiterId: req.user.id })
            .sort({ createdAt: -1 })
            .select('-jdText'); // Don't send huge text blobs on list view
            
        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        next(error);
    }
};

// @desc    Download session as CSV
// @route   GET /api/recruiter/sessions/:id/download
export const downloadShortlist = async (req, res, next) => {
    try {
        const session = await ScreeningSession.findById(req.params.id);
        if (!session || session.recruiterId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const fields = ['filename', 'score', 'cluster', 'matchedSkills', 'missingSkills', 'explanation', 'fileUrl'];
        const csv = parse(session.results, { fields });

        res.header('Content-Type', 'text/csv');
        res.attachment(`shortlist_${session.jobTitle.replace(/\s+/g, '_')}.csv`);
        res.send(csv);
    } catch (error) {
        next(error);
    }
};