import React from 'react';
import { ExpenseSummary } from '../types';
import { DollarSign, Calendar, TrendingUp, CreditCard } from 'lucide-react';

interface SummaryCardsProps {
  summary: ExpenseSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Expenses */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <DollarSign size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Total Expenses</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(summary.total)}</h3>
        </div>
      </div>

      {/* Monthly Total */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
          <Calendar size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">This Month</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(summary.monthlyTotal)}</h3>
        </div>
      </div>

      {/* Daily Total */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Today</p>
          <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(summary.dailyTotal)}</h3>
        </div>
      </div>

      {/* Highest Category */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-lg">
          <CreditCard size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Highest Spend</p>
          <h3 className="text-lg font-bold text-slate-800 truncate max-w-[120px]">
            {summary.highestCategory.category}
          </h3>
          <p className="text-xs text-rose-600 font-semibold">{formatCurrency(summary.highestCategory.amount)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;