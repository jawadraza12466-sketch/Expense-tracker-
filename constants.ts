import { Category } from './types';

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Rent',
  'Shopping',
  'Bills',
  'Education',
  'Health',
  'Other'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#10b981',      // emerald-500
  Transport: '#3b82f6', // blue-500
  Rent: '#6366f1',      // indigo-500
  Shopping: '#f59e0b',  // amber-500
  Bills: '#ef4444',     // red-500
  Education: '#8b5cf6', // violet-500
  Health: '#ec4899',    // pink-500
  Other: '#64748b'      // slate-500
};

export const INITIAL_EXPENSES_SEED = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 150.50,
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Monthly Rent',
    amount: 1200.00,
    category: 'Rent',
    date: new Date().toISOString().split('T')[0],
    createdAt: Date.now() - 1000
  },
  {
    id: '3',
    title: 'Gas Station',
    amount: 45.00,
    category: 'Transport',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    createdAt: Date.now() - 2000
  },
  {
    id: '4',
    title: 'Internet Bill',
    amount: 60.00,
    category: 'Bills',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    createdAt: Date.now() - 3000
  },
  {
    id: '5',
    title: 'New Sneakers',
    amount: 89.99,
    category: 'Shopping',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    createdAt: Date.now() - 4000
  }
];