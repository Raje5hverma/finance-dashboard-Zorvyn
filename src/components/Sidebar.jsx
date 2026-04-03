import React from 'react'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
]

export default function Sidebar({ isOpen, onClose }) {
  const { state, dispatch } = useApp()

  const navigate = (view) => {
    dispatch({ type: 'SET_VIEW', payload: view })
    onClose?.()
  }

  const setRole = (e) => {
    dispatch({ type: 'SET_ROLE', payload: e.target.value })
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">
            <TrendingUp />
          </div>
          <span className="logo-text">Fin<span>Vault</span></span>
        </div>

        {/* Mobile close */}
        <button
          onClick={onClose}
          style={{
            display: 'none',
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
          className="mobile-close"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Navigation</span>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${state.activeView === id ? 'active' : ''}`}
            onClick={() => navigate(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-badge-container">
          <div className="role-label">Current Role</div>
          <select
            className="role-select"
            value={state.role}
            onChange={setRole}
          >
            <option value="admin">Admin — Full Access</option>
            <option value="viewer">Viewer — Read Only</option>
          </select>
        </div>

        <div style={{ padding: '4px 8px' }}>
          <span className={`role-chip ${state.role}`}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: state.role === 'admin' ? 'var(--accent-gold)' : 'var(--accent-blue)',
              display: 'inline-block'
            }} />
            {state.role === 'admin' ? 'Admin' : 'Viewer'}
          </span>
        </div>
      </div>
    </aside>
  )
}
