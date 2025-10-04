// src/components/EditExpenseForm.jsx
import React, { useState } from "react";
import axios from "axios";

const EditExpenseForm = ({ expense, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...expense });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/${expense.id}`, formData);
      onSave(res.data); // pass updated expense back
    } catch (err) {
      alert("Failed to update expense");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Amount"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Note"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;
