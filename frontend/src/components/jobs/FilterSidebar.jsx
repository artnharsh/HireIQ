import { useState } from 'react';
import useJobStore from '../../store/jobStore';
import { JOB_TYPES, EXPERIENCE_LEVELS, WORK_MODES, DOMAINS } from '../../constants/filterOptions';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Reusable Collapsible Wrapper
const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 hover:text-slate-300 transition-colors"
            >
                {title}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {isOpen && <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">{children}</div>}
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
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={filters[category].includes(option)}
                        onChange={() => handleCheckbox(category, option)}
                        className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-600 bg-slate-900"
                    />
                    <span className="text-sm text-slate-300">{option}</span>
                </label>
            ))}
        </>
    );

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit sticky top-6 overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-slate-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={clearFilters} className="text-xs text-indigo-400 hover:text-indigo-300">
                    Clear All
                </button>
            </div>

            <CollapsibleSection title="Work Mode">
                <CheckboxGroup category="workMode" options={WORK_MODES} />
            </CollapsibleSection>

            <CollapsibleSection title="Job Type">
                <CheckboxGroup category="type" options={JOB_TYPES} />
            </CollapsibleSection>

            <CollapsibleSection title="Experience">
                <div className="space-y-2">
                    {EXPERIENCE_LEVELS.map(option => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="experienceFilter"
                                checked={filters.experience.includes(option)}
                                onChange={() => setFilters({ experience: [option] })} // Arrays override for radio
                                className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-600"
                            />
                            <span className="text-sm text-slate-300">{option}</span>
                        </label>
                    ))}
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Domain">
                <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
                    onChange={(e) => setFilters({ domain: e.target.value ? [e.target.value] : [] })}
                    value={filters.domain[0] || ''}
                >
                    <option value="">All Domains</option>
                    {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </CollapsibleSection>

            <CollapsibleSection title="Salary Range (Min/Max)">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 bg-slate-950 border border-slate-800 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                        onChange={(e) => setFilters({ salary_min: e.target.value })}
                        value={filters.salary_min || ''}
                    />
                    <span className="text-slate-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 bg-slate-950 border border-slate-800 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
                        onChange={(e) => setFilters({ salary_max: e.target.value })}
                        value={filters.salary_max || ''}
                    />
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Date Posted" defaultOpen={false}>
                {['Any time', 'Past 24 hours', 'Past week', 'Past month'].map(time => (
                    <label key={time} className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="radio"
                            name="datePosted"
                            checked={filters.datePosted === time}
                            onChange={() => setFilters({ datePosted: time })}
                            className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-600"
                        />
                        <span className="text-sm text-slate-300">{time}</span>
                    </label>
                ))}
            </CollapsibleSection>
        </div>
    );
};

export default FilterSidebar;