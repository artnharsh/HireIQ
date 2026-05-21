const JobCardSkeleton = () => {
    return (
        <div className="bg-sage-50 dark:bg-sage-950 border border-sage-300/30 dark:border-sage-700/30 rounded-2xl p-6 shadow-sm w-full animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-sage-200 dark:bg-sage-800"></div>
                    <div>
                        <div className="h-5 w-48 bg-sage-200 dark:bg-sage-800 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-sage-200 dark:bg-sage-800 rounded"></div>
                    </div>
                </div>
                <div className="h-6 w-16 bg-sage-200 dark:bg-sage-800 rounded-full"></div>
            </div>
            <div className="flex gap-2 mb-6">
                <div className="h-6 w-20 bg-sage-200 dark:bg-sage-800 rounded"></div>
                <div className="h-6 w-20 bg-sage-200 dark:bg-sage-800 rounded"></div>
                <div className="h-6 w-24 bg-sage-200 dark:bg-sage-800 rounded"></div>
            </div>
            <div className="h-10 w-full bg-sage-200 dark:bg-sage-800 rounded-lg"></div>
        </div>
    );
};

export default JobCardSkeleton;