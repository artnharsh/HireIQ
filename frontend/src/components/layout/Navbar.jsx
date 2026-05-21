import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import useAuthStore from '../../store/authStore';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isLanding = location.pathname === '/';

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled || !isLanding 
                ? 'bg-sage-50/80 dark:bg-sage-950/80 backdrop-blur-md border-b border-sage-300/30 dark:border-sage-700/30 py-3' 
                : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="text-2xl font-black tracking-tighter text-sage-700 dark:text-sage-50 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sage-700 dark:bg-sage-300 flex items-center justify-center">
                        <div className="w-3 h-3 bg-sage-50 dark:bg-sage-900 rounded-full"></div>
                    </div>
                    HireIQ
                </Link>

                <div className="flex items-center gap-6">
                    {/* 👇 ROLE-BASED NAVIGATION 👇 */}
                    {user && (
                        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-sage-700/70 dark:text-sage-300/70">
                            {user.role === 'recruiter' ? (
                                <>
                                    <Link to="/recruiter/dashboard" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Hub</Link>
                                    <Link to="/recruiter/post-job" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Post Job</Link>
                                    <Link to="/recruiter/bulk-screen" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Bulk Screen</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/jobs" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Job Feed</Link>
                                    <Link to="/resume-analysis" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Resume Analysis</Link>
                                    <Link to="/tracker" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Tracker</Link>
                                    <Link to="/dashboard" className="hover:text-sage-700 dark:hover:text-sage-50 transition-colors">Analytics</Link>
                                </>
                            )}
                        </div>
                    )}

                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-sage-100 dark:hover:bg-sage-900 transition-colors text-sage-700 dark:text-sage-300">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-10 h-10 rounded-full bg-sage-300 dark:bg-sage-700 flex items-center justify-center text-sage-900 dark:text-sage-50 font-bold border-2 border-sage-50 dark:border-sage-900 shadow-sm transition-transform hover:scale-105"
                            >
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-48 bg-sage-50 dark:bg-sage-900 border border-sage-300/50 dark:border-sage-700/50 rounded-xl shadow-xl py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-sage-300/30 dark:border-sage-700/30 mb-2">
                                            <p className="text-sm font-bold text-sage-900 dark:text-sage-50 truncate">{user.name}</p>
                                            <p className="text-xs text-sage-700/70 dark:text-sage-300/70 capitalize">{user.role}</p>
                                        </div>
                                        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><LogOut className="w-4 h-4"/> Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="px-5 py-2 rounded-full text-sm font-semibold text-sage-700 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-sage-900 transition-colors">Log In</Link>
                            <Link to="/signup" className="px-5 py-2 rounded-full text-sm font-semibold bg-sage-700 text-sage-50 hover:bg-sage-900 dark:bg-sage-300 dark:text-sage-900 dark:hover:bg-sage-50 transition-colors shadow-lg shadow-sage-700/20">Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;