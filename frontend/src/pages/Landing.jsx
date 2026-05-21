import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BrainCircuit, Zap, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const Landing = () => {
    const { scrollY } = useScroll();
    
    // Parallax values
    const yText = useTransform(scrollY, [0, 500], [0, 150]);
    const yShapes = useTransform(scrollY, [0, 500], [0, -150]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div className="min-h-screen bg-sage-50 dark:bg-sage-950 selection:bg-sage-300/50 overflow-hidden font-sans">
            <Navbar />

            {/* HERO SECTION */}
            <main className="relative h-screen flex items-center justify-center px-6">
                {/* Abstract Parallax Background Shapes */}
                <motion.div style={{ y: yShapes }} className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-40 dark:opacity-20">
                    <div className="w-[600px] h-[600px] bg-sage-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="w-[500px] h-[500px] bg-sage-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 -ml-32 mt-32"></div>
                </motion.div>

                <motion.div 
                    style={{ y: yText, opacity: opacityHero }}
                    className="relative z-10 text-center max-w-4xl"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300 text-sm font-semibold mb-8 border border-sage-300/50 dark:border-sage-700/50"
                    >
                        <Zap className="w-4 h-4 text-amber-500" />
                        The AI-Powered Hiring Standard
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-6xl md:text-8xl font-black text-sage-900 dark:text-sage-50 tracking-tighter leading-[1.1] mb-6"
                    >
                        Hire <span className="text-sage-700 dark:text-sage-300 italic">Smarter.</span> <br/> Work <span className="underline decoration-sage-300 decoration-8 underline-offset-4">Better.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-sage-700/80 dark:text-sage-300/80 mb-10 max-w-2xl mx-auto"
                    >
                        Drop the manual screening. HireIQ matches elite talent with perfect roles using deep neural analysis, in seconds.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-sage-700 text-sage-50 dark:bg-sage-300 dark:text-sage-900 font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-sage-700/20">
                            Start Exploring <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </motion.div>
            </main>

            {/* FEATURE SECTION */}
            <section className="py-32 px-6 bg-sage-900 dark:bg-sage-950 text-sage-50 relative z-20 rounded-t-[3rem] border-t border-sage-700">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Precision Engineering.</h2>
                        <p className="text-sage-300 max-w-2xl mx-auto text-lg">We don't just search keywords. Our AI understands context, nuance, and true capability.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <BrainCircuit className="w-8 h-8 text-sage-300"/>, title: "Deep Context Matching", desc: "Our ML engine reads resumes like a Senior Technical Recruiter, understanding tool ecosystems." },
                            { icon: <Zap className="w-8 h-8 text-sage-300"/>, title: "Instant Shortlisting", desc: "Upload 50 PDFs and get a color-coded, statistically ranked pipeline in under 30 seconds." },
                            { icon: <ShieldCheck className="w-8 h-8 text-sage-300"/>, title: "Bias-Free Evaluation", desc: "Algorithms blind to demographics, focusing purely on architectural and developmental merit." }
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="bg-sage-950/50 border border-sage-700 p-8 rounded-3xl hover:bg-sage-800 transition-colors"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-sage-700/30 flex items-center justify-center mb-6 border border-sage-700/50">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-sage-300/80 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;