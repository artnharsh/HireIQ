import { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import useResume from '../../hooks/useResume';

const ResumeUploader = () => {
    const fileInputRef = useRef(null);
    const { resume } = useResumeStore();
    const { uploadResume, isLoading, error } = useResume();
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file) => {
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx'))) {
            uploadResume(file);
        }
    };

    return (
        <div className="w-full font-sans">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-800 flex items-center justify-center font-black text-sm text-sage-900 dark:text-sage-50">1</div>
                <h2 className="text-xl font-black text-sage-900 dark:text-sage-50 tracking-tight">Provide Context</h2>
            </div>
            
            <AnimatePresence mode="wait">
                {!resume ? (
                    <motion.div 
                        key="upload-zone"
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => !isLoading && fileInputRef.current?.click()}
                        className={`relative overflow-hidden border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                            dragActive 
                                ? 'border-sage-500 bg-sage-500/10 scale-[1.02]' 
                                : 'border-sage-300 dark:border-sage-700 hover:border-sage-400 dark:hover:border-sage-500 hover:bg-sage-50/50 dark:hover:bg-sage-900/30'
                        } ${isLoading ? 'pointer-events-none opacity-80' : ''}`}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.docx" onChange={(e) => handleFile(e.target.files[0])} />
                        
                        {isLoading ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                                <Loader2 className="w-12 h-12 text-sage-500 animate-spin mb-4" />
                                <p className="text-sage-900 dark:text-sage-50 font-bold text-lg">Extracting Vector Data...</p>
                                <p className="text-sage-500 text-sm mt-1">Our neural engine is parsing your profile.</p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <UploadCloud className="w-10 h-10 text-sage-500 dark:text-sage-400" />
                                </div>
                                <p className="text-lg text-sage-900 dark:text-sage-50 font-bold mb-2">Drag & Drop Resume</p>
                                <p className="text-sm text-sage-500 font-medium">or click to browse local files</p>
                                <div className="mt-6 flex gap-3">
                                    <span className="px-3 py-1 bg-sage-100 dark:bg-sage-900 rounded-md text-[10px] font-black uppercase tracking-widest text-sage-500">PDF</span>
                                    <span className="px-3 py-1 bg-sage-100 dark:bg-sage-900 rounded-md text-[10px] font-black uppercase tracking-widest text-sage-500">DOCX</span>
                                </div>
                            </>
                        )}
                        {error && <p className="text-red-500 mt-6 text-sm font-bold bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="success-zone"
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-sage-50/50 dark:bg-sage-950/50 p-6 rounded-3xl border border-sage-200 dark:border-sage-800"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-sage-900 rounded-xl flex items-center justify-center shadow-sm border border-sage-100 dark:border-sage-800">
                                    <FileText className="w-6 h-6 text-sage-500 dark:text-sage-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-sage-900 dark:text-sage-50 truncate max-w-[200px] md:max-w-[300px]">{resume.fileName}</p>
                                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1 uppercase tracking-widest">
                                        <CheckCircle className="w-3.5 h-3.5" /> Parsed Context
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold px-4 py-2 bg-white dark:bg-sage-900 border border-sage-200 dark:border-sage-700 text-sage-600 dark:text-sage-300 hover:text-sage-900 dark:hover:text-sage-50 hover:border-sage-300 dark:hover:border-sage-600 rounded-lg transition-colors">
                                Replace Profile
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.docx" onChange={(e) => handleFile(e.target.files[0])} />
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-sage-200/50 dark:border-sage-800/50">
                            <p className="text-[10px] font-black text-sage-400 uppercase tracking-widest mb-4">Extracted Vectors</p>
                            <div className="flex flex-wrap gap-2">
                                {resume.extractedSkills.slice(0, 10).map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-white dark:bg-sage-900 text-sage-700 dark:text-sage-300 text-xs font-medium rounded-lg border border-sage-200 dark:border-sage-800 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                                {resume.extractedSkills.length > 10 && (
                                    <span className="px-3 py-1.5 bg-sage-200/50 dark:bg-sage-800/50 text-sage-600 dark:text-sage-400 font-bold text-xs rounded-lg">
                                        +{resume.extractedSkills.length - 10} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeUploader;