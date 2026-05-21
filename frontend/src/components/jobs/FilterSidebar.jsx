import { useState } from 'react';
import useJobStore from '../../store/jobStore';
import { JOB_TYPES, EXPERIENCE_LEVELS, WORK_MODES, DOMAINS } from '../../constants/filterOptions';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-[11px] font-black text-sage-400 dark:text-sage-500 uppercase tracking-widest mb-4 hover:text-sage-900 dark:hover:text-sage-50 transition-colors"
            >
                {title}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isOpen && <div className="space-y-3.5 animate-in slide-in-from-top-2 fade-in duration-200">{children}</div>}
        </div>
    );
};

const FilterSidebar = () => {
    const { filters, setFilters, clearFilters } = useJobStore();

    const handleCheckbox = (category, value) => {
        const currentList = filters[category];
        const updatedList = currentList.includes(value)
            ? currentList.filter(item => item !== value)
            : [...currentList, value];
        setFilters({ [category]: updatedList });
    };

    const CheckboxGroup = ({ category, options }) => (
        <>
            {options.map(option => (
                <label key={option} className="flex items-center gap-4 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters[category].includes(option)}
                        onChange={() => handleCheckbox(category, option)}
                        className="w-4 h-4 rounded border-sage-300 dark:border-sage-600 accent-sage-900 dark:accent-sage-100 bg-transparent cursor-pointer transition-all"
                    />
                    <span className="text-sm font-medium text-sage-600 dark:text-sage-400 group-hover:text-sage-900 dark:group-hover:text-sage-50 transition-colors">{option}</span>
                </label>
            ))}
        </>
    );

    return (
        <div className="w-full font-sans">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-sage-200/60 dark:border-sage-800/60">
                <h2 className="text-sm font-black uppercase tracking-widest text-sage-900 dark:text-sage-50">Filter Roles</h2>
                <button 
                    onClick={clearFilters} 
                    className="text-xs font-bold text-sage-400 hover:text-sage-900 dark:hover:text-sage-100 transition-colors"
                >
                    Clear
                </button>
            </div>

            <CollapsibleSection title="Work Mode">
                <CheckboxGroup category="workMode" options={WORK_MODES} />
            </CollapsibleSection>

            <CollapsibleSection title="Job Type">
                <CheckboxGroup category="type" options={JOB_TYPES} />
            </CollapsibleSection>

            <CollapsibleSection title="Experience">
                <div className="space-y-3.5">
                    {EXPERIENCE_LEVELS.map(option => (
                        <label key={option} className="flex items-center gap-4 cursor-pointer group">
                            <input
                                type="radio"
                                name="experienceFilter"
                                checked={filters.experience.includes(option)}
                                onChange={() => setFilters({ experience: [option] })}
                                className="w-4 h-4 border-sage-300 dark:border-sage-600 accent-sage-900 dark:accent-sage-100 bg-transparent cursor-pointer"
                            />
                            <span className="text-sm font-medium text-sage-600 dark:text-sage-400 group-hover:text-sage-900 dark:group-hover:text-sage-50 transition-colors">{option}</span>
                        </label>
                    ))}
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Domain">
                <select
                    className="w-full bg-white dark:bg-sage-900 border border-sage-200 dark:border-sage-800 rounded-lg px-4 py-3 text-sm font-bold text-sage-900 dark:text-sage-50 focus:outline-none focus:border-sage-400 cursor-pointer shadow-sm"
                    onChange={(e) => setFilters({ domain: e.target.value ? [e.target.value] : [] })}
                    value={filters.domain[0] || ''}
                >
                    <option value="">All Domains</option>
                    {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </CollapsibleSection>
        </div>
    );
};

export default FilterSidebar;