import React, { useMemo, useState } from 'react'
import { Search, Plus, Pencil, Trash2, ArrowUpDown, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData'
import TransactionModal from './TransactionModal'

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN')
}

const PAGE_SIZE = 12

export default function Transactions() {
  const { state, dispatch } = useApp()
  const { transactions, filters, role } = state
  const isAdmin = role === 'admin'

  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [page, setPage] = useState(1)

  const setFilter = (key, val) => {
    dispatch({ type: 'SET_FILTER', payload: { [key]: val } })
    setPage(1)
  }

  const filtered = useMemo(() => {
    let list = [...transactions]
    const { search, type, category, sortBy } = filters

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }
    if (type !== 'all') list = list.filter((t) => t.type === type)
    if (category !== 'all') list = list.filter((t) => t.category === category)

    switch (sortBy) {
      case 'date_desc': list.sort((a, b) => b.date.localeCompare(a.date)); break
      case 'date_asc': list.sort((a, b) => a.date.localeCompare(b.date)); break
      case 'amount_desc': list.sort((a, b) => b.amount - a.amount); break
      case 'amount_asc': list.sort((a, b) => a.amount - b.amount); break
      default: break
    }
    return list
  }, [transactions, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    }
  }

  const openEdit = (t) => {
    setEditTarget(t)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditTarget(null)
  }

  return (
    <div>
      {!isAdmin && (
        <div className="viewer-banner">
          <Info />
          You are in Viewer mode. Switch to Admin in the sidebar to add or edit transactions.
        </div>
      )}

      <div className="card">
        <div className="filters-bar">
          <div className="search-wrap">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search description or category…"
              className="search-input"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            className="filter-select"
            value={filters.sortBy}
            onChange={(e) => setFilter('sortBy', e.target.value)}
          >
            <option value="date_desc">Date (Newest)</option>
            <option value="date_asc">Date (Oldest)</option>
            <option value="amount_desc">Amount (High → Low)</option>
            <option value="amount_asc">Amount (Low → High)</option>
          </select>

          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={() => { setEditTarget(null); setShowModal(true) }}
            >
              <Plus /> Add
            </button>
          )}
        </div>

        {paginated.length === 0 ? (
          <div className="empty-state">
            <Search />
            <p>No transactions match your filters.</p>
            <button
              className="btn btn-ghost"
              onClick={() => dispatch({ type: 'SET_FILTER', payload: { search: '', type: 'all', category: 'all' } })}
              style={{ marginTop: 8 }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th onClick={() => setFilter('sortBy', filters.sortBy === 'date_desc' ? 'date_asc' : 'date_desc')}>
                    Date <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: 2 }} />
                  </th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th
                    style={{ textAlign: 'right' }}
                    onClick={() => setFilter('sortBy', filters.sortBy === 'amount_desc' ? 'amount_asc' : 'amount_desc')}
                  >
                    Amount <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: 2 }} />
                  </th>
                  {isAdmin && <th style={{ width: 80 }}></th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <tr key={t.id}>
                    <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td style={{ fontSize: 13, maxWidth: 200 }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.description}
                      </span>
                    </td>
                    <td>
                      <span className="category-pill">
                        <span
                          className="category-dot"
                          style={{ background: CATEGORY_COLORS[t.category] || '#6b7280' }}
                        />
                        {t.category}
                      </span>
                    </td>
                    <td>
                      <span className={`type-badge ${t.type}`}>{t.type}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`amount-cell ${t.type}`}>
                        {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        <div className="table-actions">
                          <button className="action-btn" onClick={() => openEdit(t)} title="Edit">
                            <Pencil />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(t.id)} title="Delete">
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pagination">
          <span>{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</span>
          <div className="pagination-btns">
            <button
              className="btn btn-ghost"
              style={{ padding: '6px 12px', fontSize: 12 }}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Prev
            </button>
            <span style={{ padding: '6px 10px', fontSize: 12, color: 'var(--text-secondary)' }}>
              {page} / {totalPages}
            </span>
            <button
              className="btn btn-ghost"
              style={{ padding: '6px 12px', fontSize: 12 }}
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <TransactionModal existing={editTarget} onClose={closeModal} />
      )}
    </div>
  )
}
