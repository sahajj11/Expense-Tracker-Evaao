import React, { useState } from 'react';
import AddExpenseForm from './AddExpenseForm';
import ExpenseTable from './ExpenseTable';
import EditExpenseForm from './EditExpenseForm';




const App = () => {
  const [expenses, setExpenses] = useState([]);
  

  const addExpense = (newExpense) => {
    
    const id = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    setExpenses([...expenses, { ...newExpense, id }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  

  
 
  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Personal Expense Tracker</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
       
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Expense</h2>
          <AddExpenseForm onAddExpense={addExpense} />
        </div>

       
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <ExpenseTable 
            expenses={expenses} 
            onDeleteExpense={deleteExpense} 
            totalSpent={totalSpent}
           
          />
        </div>
      </main>
      
    </div>
  );
};

export default App;