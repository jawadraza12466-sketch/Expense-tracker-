import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { Expense, ExpenseSummary, Category } from './types';
import { getStoredExpenses, saveExpensesToStorage } from './services/storageService';
import SummaryCards from './components/SummaryCards';
import Analytics from './components/Analytics';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Load initial data
  useEffect(() => {
    const stored = getStoredExpenses();
    setExpenses(stored);
  }, []);

  // Save on change
  useEffect(() => {
    saveExpensesToStorage(expenses);
  }, [expenses]);

  // Derived state: Summary
  const summary = useMemo((): ExpenseSummary => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = today.substring(0, 7); // YYYY-MM

    let total = 0;
    let monthlyTotal = 0;
    let dailyTotal = 0;
    const categoryTotals = new Map<Category, number>();

    expenses.forEach(exp => {
      total += exp.amount;
      
      if (exp.date.startsWith(currentMonth)) {
        monthlyTotal += exp.amount;
      }
      
      if (exp.date === today) {
        dailyTotal += exp.amount;
      }

      const currentCatTotal = categoryTotals.get(exp.category) || 0;
      categoryTotals.set(exp.category, currentCatTotal + exp.amount);
    });

    // Find highest category
    let highestCategory: { category: Category | 'None'; amount: number } = { category: 'None', amount: 0 };
    categoryTotals.forEach((amount, category) => {
      if (amount > highestCategory.amount) {
        highestCategory = { category, amount };
      }
    });

    return { total, monthlyTotal, dailyTotal, highestCategory };
  }, [expenses]);

  // Handlers
  const handleAddExpense = (data: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const handleEditExpense = (data: Omit<Expense, 'id' | 'createdAt'>, id?: string) => {
    if (!id) return; // Should not happen for edit
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...data } : exp));
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    }
  };

  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Omit<Expense, 'id' | 'createdAt'>, id?: string) => {
    if (id) {
      handleEditExpense(data, id);
    } else {
      handleAddExpense(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wallet className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">ExpenseTracker<span className="text-blue-600">Pro</span></h1>
            </div>
            
            <button 
              onClick={() => {
                setEditingExpense(null);
                setIsFormOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center space-x-2 shadow-sm shadow-blue-200"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Expense</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Message (Dynamic) */}
        <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-500">Overview</h2>
            <p className="text-sm text-slate-400">Track, manage and analyze your spending.</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Analytics Charts */}
        <Analytics expenses={expenses} />

        {/* Expense List */}
        <ExpenseList 
          expenses={expenses} 
          onEdit={openEditModal} 
          onDelete={handleDeleteExpense} 
        />

      </main>

      {/* Modals */}
      <ExpenseForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        editingExpense={editingExpense}
      />
    </div>
  );
}

export default App;