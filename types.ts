export type Category = 'Food' | 'Transport' | 'Rent' | 'Shopping' | 'Bills' | 'Education' | 'Health' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO format YYYY-MM-DD
  createdAt: number;
}

export interface ExpenseSummary {
  total: number;
  monthlyTotal: number;
  dailyTotal: number;
  highestCategory: {
    category: Category | 'None';
    amount: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export type PeriodFilter = 'all' | 'month' | 'week';