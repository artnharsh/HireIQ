import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const aiClient = axios.create({
    baseURL: process.env.AI_SERVICE_URL || 'http://localhost:8000',
    headers: {
        'X-API-Key': process.env.AI_SERVICE_KEY
    }
});

export const parseResume = async (fileBuffer, originalName) => {
    const formData = new FormData();
    formData.append('file', fileBuffer, { filename: originalName });

    const response = await aiClient.post('/analyze/parse', formData, {
        headers: { ...formData.getHeaders() }
    });
    return response.data; // { text, skills }
};

export const matchResumeJD = async (resumeText, jdText) => {
    const response = await aiClient.post('/match', {
        resume_text: resumeText,
        jd_text: jdText
    });
    return response.data; // { score, matched_skills, missing_skills }
};

export const getFullAnalysis = async (resumeText, jdText) => {
    const response = await aiClient.post('/analyze/full', {
        resume_text: resumeText,
        jd_text: jdText
    });
    return response.data; // The JSON object from Groq
};

export const generateCoverLetter = async (resumeText, jdText, company, role) => {
    const response = await aiClient.post('/generate/cover-letter', {
        resume_text: resumeText,
        jd_text: jdText,
        company: company,
        role: role
    });
    return response.data; // { cover_letter: "..." }
};