import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/mockData'

const empty = {
  description: '',
  amount: '',
  category: 'Food & Dining',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
}

export default function TransactionModal({ existing, onClose }) {
  const { dispatch } = useApp()
  const [form, setForm] = useState(existing || empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.description.trim()) errs.description = 'Required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a valid amount'
    if (!form.date) errs.date = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const payload = { ...form, amount: Number(form.amount) }
    if (existing) {
      dispatch({ type: 'UPDATE_TRANSACTION', payload })
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload })
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {existing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-body">
          {/* Type toggle */}
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-toggle">
              {['income', 'expense'].map((t) => (
                <button
                  key={t}
                  className={`type-opt ${form.type === t ? `active ${t}` : ''}`}
                  onClick={() => set('type', t)}
                >
                  {t === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                style={{ colorScheme: 'dark' }}
              />
              {errors.date && <span style={{ color: 'var(--accent-red)', fontSize: 11 }}>{errors.date}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                min="0"
              />
              {errors.amount && <span style={{ color: 'var(--accent-red)', fontSize: 11 }}>{errors.amount}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Swiggy Order"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            {errors.description && <span style={{ color: 'var(--accent-red)', fontSize: 11 }}>{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {existing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
