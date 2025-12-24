import { Expense } from '../types';
import { INITIAL_EXPENSES_SEED } from '../constants';

const STORAGE_KEY = 'expense_tracker_data_v1';

export const getStoredExpenses = (): Expense[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Seed initial data for first-time users
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXPENSES_SEED));
      return INITIAL_EXPENSES_SEED as Expense[];
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse expenses from local storage', error);
    return [];
  }
};

export const saveExpensesToStorage = (expenses: Expense[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Failed to save expenses to local storage', error);
  }
};