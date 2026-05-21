import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/layout/Navbar';
import NotFound from './pages/NotFound';

// Protected Pages
import Onboarding from './pages/Onboarding';
import ResumeAnalysis from './pages/ResumeAnalysis';
import JobFeedPage from './pages/JobFeedPage';
import ApplicationTrackerPage from './pages/ApplicationTrackerPage';
import BulkScreening from './pages/BulkScreening';
import PostJob from './pages/PostJob';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

// A simple protected route wrapper
const ProtectedRoute = ({ children }) => {
    const { token } = useAuthStore();
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

// Premium Layout Wrapper for authenticated pages
const AppLayout = ({ children }) => (
    <div className="min-h-screen bg-sage-50 dark:bg-sage-950 text-sage-900 dark:text-sage-50 font-sans selection:bg-sage-300/50 transition-colors duration-300 pt-24 pb-12">
        <Navbar />
        {children}
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/onboarding" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <Onboarding />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                {/* Candidate Routes */}
                <Route path="/resume-analysis" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <ResumeAnalysis />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                <Route path="/jobs" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <JobFeedPage />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                <Route path="/tracker" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <ApplicationTrackerPage />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                {/* Placeholder for Candidate Dashboard */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <AnalyticsDashboard />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                {/* Recruiter Routes */}
                <Route path="/recruiter/bulk-screen" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <BulkScreening />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                <Route path="/recruiter/post-job" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <PostJob />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                <Route path="/recruiter/dashboard" element={
                    <ProtectedRoute>
                        <AppLayout>
                            <RecruiterDashboard />
                        </AppLayout>
                    </ProtectedRoute>
                } />

                {/* 404 Fallback - Custom NotFound Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;