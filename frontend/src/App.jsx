import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Login from './pages/Login';
// import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';

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
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
                    
                    {/* Protected Routes */}
                    <Route path="/onboarding" element={
                        <ProtectedRoute>
                            <Onboarding />
                        </ProtectedRoute>
                    } />
                    
                    {/* Placeholder for Candidate/Recruiter Dashboards */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <div className="p-8">Dashboard coming Day 3/5...</div>
                        </ProtectedRoute>
                    } />
                    
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;