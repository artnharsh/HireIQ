import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';
import api from '../services/api';
import useAuthStore from '../store/authStore';

const Onboarding = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setAuth, token } = useAuthStore();

    const handleComplete = async () => {
        if (!selectedRole) return;
        setLoading(true);
        try {
            // Need a quick backend route to patch the role (Assuming you add this to auth/user routes later)
            const response = await api.patch('/auth/role', { role: selectedRole });
            
            if (response.data.success) {
                // Update local state
                setAuth({ token, ...user, role: selectedRole });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-2xl p-8 space-y-8 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">How will you use HireIQ?</h1>
                    <p className="text-slate-400 text-sm">Choose your path to customize your experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Candidate Card */}
                    <div 
                        onClick={() => setSelectedRole('candidate')}
                        className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                            selectedRole === 'candidate' 
                            ? 'border-indigo-500 bg-indigo-500/10' 
                            : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                        }`}
                    >
                        <User className={`w-8 h-8 mb-4 ${selectedRole === 'candidate' ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <h3 className="text-lg font-semibold mb-2">I'm a Candidate</h3>
                        <p className="text-sm text-slate-400">Upload your resume, get AI feedback, generate cover letters, and find jobs.</p>
                    </div>

                    {/* Recruiter Card */}
                    <div 
                        onClick={() => setSelectedRole('recruiter')}
                        className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                            selectedRole === 'recruiter' 
                            ? 'border-indigo-500 bg-indigo-500/10' 
                            : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                        }`}
                    >
                        <Briefcase className={`w-8 h-8 mb-4 ${selectedRole === 'recruiter' ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <h3 className="text-lg font-semibold mb-2">I'm a Recruiter</h3>
                        <p className="text-sm text-slate-400">Post jobs, upload bulk resumes, and let AI rank candidates for you.</p>
                    </div>
                </div>

                <button 
                    disabled={!selectedRole || loading}
                    onClick={handleComplete}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
                >
                    {loading ? 'Setting up...' : 'Continue to Dashboard'}
                </button>
            </div>
        </div>
    );
};

export default Onboarding;