import { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an axios instance setup here

const useAnalytics = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSkillTrends = async (domain = 'All') => {
        setIsLoading(true);
        try {
            const res = await api.get(`/analytics/skills/trending?domain=${domain}`);
            return res.data.data;
        } catch (err) {
            setError('Failed to load skill trends');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFunnel = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/analytics/candidate/funnel');
            return res.data.data;
        } catch (err) {
            setError('Failed to load application funnel');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const fetchScoreTimeline = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/analytics/candidate/scores');
            return res.data.data;
        } catch (err) {
            setError('Failed to load score timeline');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchSkillTrends, fetchFunnel, fetchScoreTimeline, isLoading, error };
};

export default useAnalytics;