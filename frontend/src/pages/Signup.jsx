import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import GoogleOAuthButton from '../components/auth/GoogleOAuthButton';
import api from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [localError, setLocalError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { setAuth, token, user } = useAuthStore();

    // Redirect if already logged in
    useEffect(() => {
        if (token && user) {
            if (!user.role) navigate('/onboarding');
            else navigate('/dashboard');
        }
    }, [token, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (formData.password !== formData.confirmPassword) {
            return setLocalError('Passwords do not match');
        }

        setIsLoading(true);
        try {
            const response = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                setAuth(response.data.data);
                navigate('/onboarding'); // Fresh signups always go to onboarding
            }
        } catch (error) {
            setLocalError(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
                    <p className="text-sm text-slate-400 mt-2">Join HireIQ today</p>
                </div>

                {localError && <div className="p-3 text-sm text-red-400 bg-red-950/50 rounded-md border border-red-900/50">{localError}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            required
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            required
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                        />
                    </div>
                    <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-800"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">OR</span>
                    <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <GoogleOAuthButton />

                <p className="text-center text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;