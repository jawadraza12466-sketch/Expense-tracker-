import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Expense, Category } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface AnalyticsProps {
  expenses: Expense[];
}

const Analytics: React.FC<AnalyticsProps> = ({ expenses }) => {
  
  // Calculate Category Data for Pie Chart
  const categoryData = React.useMemo(() => {
    const map = new Map<Category, number>();
    expenses.forEach(exp => {
      const current = map.get(exp.category) || 0;
      map.set(exp.category, current + exp.amount);
    });

    return Array.from(map.entries()).map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name]
    })).sort((a, b) => b.value - a.value); // Sort descending
  }, [expenses]);

  // Calculate Monthly Data for Bar Chart
  const monthlyData = React.useMemo(() => {
    const map = new Map<string, number>();
    expenses.forEach(exp => {
      // Format YYYY-MM
      const monthKey = exp.date.substring(0, 7); 
      const current = map.get(monthKey) || 0;
      map.set(monthKey, current + exp.amount);
    });

    // Get last 6 months to keep chart readable
    const sortedKeys = Array.from(map.keys()).sort();
    return sortedKeys.slice(-6).map(key => {
        const [year, month] = key.split('-');
        const dateObj = new Date(parseInt(year), parseInt(month) - 1);
        return {
            name: dateObj.toLocaleString('default', { month: 'short' }),
            fullDate: key,
            value: map.get(key) || 0
        };
    });
  }, [expenses]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg">
          <p className="text-slate-800 font-semibold">{label || payload[0].name}</p>
          <p className="text-indigo-600 font-bold">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (expenses.length === 0) {
      return (
          <div className="grid grid-cols-1 gap-6 mb-8">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-center items-center h-64 text-slate-400">
                    No data available for analytics
               </div>
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Expenses by Category</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly Trends</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;