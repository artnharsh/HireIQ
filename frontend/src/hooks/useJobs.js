import { useState } from 'react';
import api from '../services/api';
import useJobStore from '../store/jobStore';

const useJobs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { setJobs, filters } = useJobStore();

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            // Convert array filters to comma-separated strings for the backend
            const queryParams = new URLSearchParams();
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.type.length) queryParams.append('type', filters.type.join(','));
            if (filters.experience.length) queryParams.append('experience', filters.experience.join(','));
            if (filters.domain.length) queryParams.append('domain', filters.domain.join(','));
            if (filters.workMode.length) queryParams.append('workMode', filters.workMode.join(','));
            if (filters.salary_min) queryParams.append('salary_min', filters.salary_min);
            if (filters.salary_max) queryParams.append('salary_max', filters.salary_max);
            if (filters.datePosted && filters.datePosted !== 'Any time') queryParams.append('datePosted', filters.datePosted);

            const res = await api.get(`/jobs?${queryParams.toString()}`);
            if (res.data.success) {
                setJobs(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        } finally {
            setIsLoading(false);
        }
    };

    const generateCoverLetter = async (jdText, company, role) => {
        setIsGenerating(true);
        try {
            const res = await api.post('/applications/cover-letter', { jdText, company, role });
            return res.data.data; // Returns the cover letter string
        } catch (err) {
            console.error('Failed to generate letter', err);
            return null;
        } finally {
            setIsGenerating(false);
        }
    };

    const updateApplicationStatus = async (jobId, status, matchScore = null) => {
        try {
            await api.post('/applications', { jobId, status, matchScore });
            // In a real app, trigger a toast notification here
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    return { fetchJobs, generateCoverLetter, updateApplicationStatus, isLoading, isGenerating };
};

export default useJobs;