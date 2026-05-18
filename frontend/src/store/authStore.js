import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,

    setAuth: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        set({ user: data, token: data.token, error: null });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, error: null });
    },

    loginUser: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.success) {
                set({ user: response.data.data, token: response.data.data.token, isLoading: false });
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || 'Login failed' });
        }
    }
}));

export default useAuthStore;