import React, { useEffect, useState } from 'react';
import axios from 'axios';

const categories = ['Food', 'Travel', 'Bills', 'Entertainment', 'Other'];

const ExpenseTable = ({ onDeleteExpense }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null); // Track which expense is being edited
  const [editData, setEditData] = useState({ amount: '', date: '', note: '', category: '' });

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/'); 
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load expenses.');
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/api/${_id}`);
        setExpenses(expenses.filter((e) => e._id !== _id));
        if (onDeleteExpense) onDeleteExpense(_id);
      } catch (err) {
        console.error(err);
        alert('Failed to delete expense.');
      }
    }
  };

  // Start editing
  const handleEditClick = (expense) => {
    setEditId(expense._id);
    setEditData({
      amount: expense.amount,
      date: expense.date.split('T')[0], // for date input
      note: expense.note,
      category: expense.category,
    });
  };

  // Save edited expense
  const handleEditSave = async (_id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/${_id}`, editData);
      setExpenses(expenses.map((e) => (e._id === _id ? res.data : e)));
      setEditId(null); // Exit edit mode
    } catch (err) {
      console.error(err);
      alert('Failed to update expense.');
    }
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditId(null);
  };

  const totalSpent = expenses.reduce((acc, exp) => acc + parseFloat(exp.amount), 0).toFixed(2);

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <p className="text-center text-gray-500 py-4">Loading expenses...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Expenses</h2>

      <div className="mb-6 p-4 bg-indigo-50 rounded-lg shadow-inner">
        <h3 className="text-lg font-bold text-indigo-800">
          Total Spent: <span className="text-2xl">${totalSpent}</span>
        </h3>
        <p className="text-sm text-indigo-600">This is the total of all recorded expenses.</p>
      </div>

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
            {expenses
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editId === expense._id ? (
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        className="border rounded p-1"
                      />
                    ) : (
                      formatDate(expense.date)
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editId === expense._id ? (
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="border rounded p-1"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          expense.category === 'Food'
                            ? 'bg-green-100 text-green-800'
                            : expense.category === 'Travel'
                            ? 'bg-blue-100 text-blue-800'
                            : expense.category === 'Bills'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {expense.category}
                      </span>
                    )}
                  </td>

                  {/* Note */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editId === expense._id ? (
                      <input
                        type="text"
                        value={editData.note}
                        onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      expense.note || 'No note'
                    )}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">
                    {editId === expense._id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                        className="border rounded p-1 w-20"
                      />
                    ) : (
                      `$${parseFloat(expense.amount).toFixed(2)}`
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editId === expense._id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(expense._id)}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(expense)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {expenses.length === 0 && (
        <p className="text-center text-gray-500 py-4">No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default ExpenseTable;
