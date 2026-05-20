import { create } from 'zustand';

const useJobStore = create((set) => ({
    jobs: [],
    savedJobs: [],
    filters: {
        type: [],
        experience: [],
        domain: [],
        workMode: [],
        search: '',
        salary_min: '',
        salary_max: '',
        datePosted: 'Any time'
    },
    
    setJobs: (jobs) => set({ jobs }),
    setFilters: (newFilters) => set((state) => ({ 
        filters: { ...state.filters, ...newFilters } 
    })),
    clearFilters: () => set({ 
        filters: { type: [], experience: [], domain: [], workMode: [], search: '' } 
    })
}));

export default useJobStore;