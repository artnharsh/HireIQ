import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected Pages
import Onboarding from './pages/Onboarding';
import ResumeAnalysis from './pages/ResumeAnalysis';
import JobFeedPage from './pages/JobFeedPage';
import ApplicationTrackerPage from './pages/ApplicationTrackerPage';
import BulkScreening from './pages/BulkScreening';
import PostJob from './pages/PostJob';
import RecruiterDashboard from './pages/RecruiterDashboard';

// A simple protected route wrapper
const ProtectedRoute = ({ children }) => {
    const { token } = useAuthStore();
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="/onboarding" element={
                        <ProtectedRoute>
                            <Onboarding />
                        </ProtectedRoute>
                    } />

                    {/* Candidate Routes */}
                    <Route path="/resume-analysis" element={
                        <ProtectedRoute>
                            <ResumeAnalysis />
                        </ProtectedRoute>
                    } />

                    <Route path="/jobs" element={
                        <ProtectedRoute>
                            <JobFeedPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/tracker" element={
                        <ProtectedRoute>
                            <ApplicationTrackerPage />
                        </ProtectedRoute>
                    } />

                    {/* Placeholder for Candidate/Recruiter Dashboards */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <div className="p-8">
                                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                                <p className="text-slate-400 mb-4">Navigate to your features:</p>
                                <ul className="space-y-2 text-indigo-400 underline">
                                    <li><a href="/resume-analysis">1. Resume Analysis</a></li>
                                    <li><a href="/jobs">2. Job Feed</a></li>
                                    <li><a href="/tracker">3. Application Tracker</a></li>
                                </ul>
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/recruiter/bulk-screen" element={<ProtectedRoute><BulkScreening /></ProtectedRoute>} />
                    <Route path="/recruiter/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
                    <Route path="/recruiter/dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
                    {/* 404 Fallback - Send to Landing Page */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;