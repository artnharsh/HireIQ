import { useState } from 'react';
import api from '../services/api';
import useResumeStore from '../store/resumeStore';

const useResume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setResume, setCurrentAnalysis } = useResumeStore();

    const fetchMyResume = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/resume/me');
            if (res.data.success && res.data.data) {
                setResume(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch resume:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const uploadResume = async (file) => {
        setIsLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await api.post('/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                setResume(res.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    const analyzeWithJD = async (jdText) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.post('/resume/analyze', { jdText });
            if (res.data.success) {
                setCurrentAnalysis(res.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Analysis failed');
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadResume, analyzeWithJD, fetchMyResume, isLoading, error };
};

export default useResume;