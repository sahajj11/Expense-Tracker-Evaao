import React from 'react';

const ExpenseTable = ({ expenses, onDeleteExpense, totalSpent}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Expenses</h2>

      {/* Summary Report */}
      <div className="mb-6 p-4 bg-indigo-50 rounded-lg shadow-inner">
        <h3 className="text-lg font-bold text-indigo-800">
          Total Spent: <span className="text-2xl">${totalSpent}</span>
        </h3>
        <p className="text-sm text-indigo-600">This is the total of all recorded expenses.</p>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Date', 'Category', 'Note', 'Amount', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    expense.category === 'Food' ? 'bg-green-100 text-green-800' :
                    expense.category === 'Travel' ? 'bg-blue-100 text-blue-800' :
                    expense.category === 'Bills' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.note}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* NOTE: Edit functionality is left as a future implementation (Good-to-Have) */}
                  <button 
                    
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this expense?')) {
                        onDeleteExpense(expense.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Fallback for no expenses */}
      {expenses.length === 0 && (
        <p className="text-center text-gray-500 py-4">No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default ExpenseTable;