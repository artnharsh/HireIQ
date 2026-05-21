import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SkillTrendChart = ({ data }) => {
    // Custom tooltip to match our premium theme
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-sage-50 dark:bg-sage-900 border border-sage-300 dark:border-sage-700 p-3 rounded-lg shadow-xl">
                    <p className="font-bold text-sage-900 dark:text-sage-50 capitalize">{payload[0].payload.skill}</p>
                    <p className="text-sm text-sage-700 dark:text-sage-300">
                        Required in <span className="font-bold">{payload[0].value}</span> jobs
                    </p>
                </div>
            );
        }
        return null;
    };

    if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-sage-500">No skill data available.</div>;

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <XAxis dataKey="skill" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} className="fill-sage-700 dark:fill-sage-300 hover:opacity-80 transition-opacity" />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillTrendChart;