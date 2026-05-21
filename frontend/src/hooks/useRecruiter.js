import { useState } from 'react';
import api from '../services/api';

const useRecruiter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const postJob = async (jobData) => {
        setIsLoading(true);
        try {
            const res = await api.post('/jobs', jobData);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const bulkScreen = async (jdText, jobTitle, files) => {
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('jdText', jdText);
            formData.append('jobTitle', jobTitle);
            files.forEach(file => {
                formData.append('files', file); // 'files' matches multer.array('files')
            });

            const res = await api.post('/recruiter/bulk-screen', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data.data; // The saved ScreeningSession object
        } catch (err) {
            setError(err.response?.data?.message || 'Bulk screening failed');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const downloadCSV = async (sessionId, jobTitle) => {
        try {
            const res = await api.get(`/recruiter/sessions/${sessionId}/download`, {
                responseType: 'blob' // Important for handling files
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `shortlist_${jobTitle.replace(/\s+/g, '_')}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Failed to download CSV', err);
        }
    };

    return { postJob, bulkScreen, downloadCSV, isLoading, error };
};

export default useRecruiter;