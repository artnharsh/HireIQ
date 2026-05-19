import { Link, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Landing = () => {
    const { token, user } = useAuthStore();

    // If they are already logged in, don't show them the landing page
    if (token && user) {
        return <Navigate to={!user.role ? "/onboarding" : "/dashboard"} replace />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-slate-50">
                HireIQ
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-md">
                The AI-Powered Job Application Intelligence Platform. Land jobs faster. Screen smarter.
            </p>
            
            <div className="flex gap-4">
                <Link 
                    to="/login" 
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md transition-colors font-medium border border-slate-700"
                >
                    Log In
                </Link>
                <Link 
                    to="/signup" 
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors font-medium"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Landing;