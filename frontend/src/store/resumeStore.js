import { create } from 'zustand';

const useResumeStore = create((set) => ({
    resume: null,
    currentAnalysis: null,
    
    setResume: (resumeData) => set({ resume: resumeData }),
    setCurrentAnalysis: (analysisData) => set({ currentAnalysis: analysisData }),
    clearResumeState: () => set({ resume: null, currentAnalysis: null })
}));

export default useResumeStore;