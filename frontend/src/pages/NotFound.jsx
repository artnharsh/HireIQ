import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-sage-50 dark:bg-sage-950 text-sage-900 dark:text-sage-50 font-sans flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                    className="text-[150px] md:text-[250px] font-black leading-none text-sage-300 dark:text-sage-900 tracking-tighter select-none"
                >
                    404
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="-mt-10 md:-mt-20 z-10 relative"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Lost in the woods.</h2>
                    <p className="text-sage-700 dark:text-sage-300 mb-8 max-w-md mx-auto">
                        The page you are looking for has been moved, deleted, or possibly never existed.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sage-700 text-sage-50 dark:bg-sage-300 dark:text-sage-900 font-bold hover:scale-105 transition-transform">
                        <ArrowLeft className="w-4 h-4" /> Return Home
                    </Link>
                </motion.div>
            </main>
        </div>
    );
};

export default NotFound;