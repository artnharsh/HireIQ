import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import GoogleOAuthButton from '../components/auth/GoogleOAuthButton';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, setAuth, isLoading, error, token, user } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Check for token in URL (from Google Auth redirect)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const urlToken = urlParams.get('token');

        if (urlToken) {
            // Fetch user profile using the token
            api.get('/auth/me', { headers: { Authorization: `Bearer ${urlToken}` } })
                .then(res => {
                    if (res.data.success) {
                        setAuth({ token: urlToken, ...res.data.data });
                    }
                })
                .catch(err => console.error("Failed to fetch user after Google Auth"));
        }
    }, [location, setAuth]);

    // Redirect based on role status
    useEffect(() => {
        if (token && user) {
            if (!user.role) navigate('/onboarding');
            else navigate('/dashboard');
        }
    }, [token, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(email, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Welcome to HireIQ</h1>
                    <p className="text-sm text-slate-400 mt-2">Sign in to your account</p>
                </div>

                {error && <div className="p-3 text-sm text-red-400 bg-red-950/50 rounded-md border border-red-900/50">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-800"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">OR</span>
                    <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <GoogleOAuthButton />

                <p className="text-center text-sm text-slate-400">
                    Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;