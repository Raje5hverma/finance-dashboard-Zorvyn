import React from 'react'
import { Menu, Bell, Download } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { initialTransactions } from '../data/mockData'

const VIEW_TITLES = {
  dashboard: { title: 'Dashboard', sub: 'Your financial overview' },
  transactions: { title: 'Transactions', sub: 'All activity' },
  insights: { title: 'Insights', sub: 'Patterns & analysis' },
}

export default function Header({ onMenuClick }) {
  const { state } = useApp()
  const { title, sub } = VIEW_TITLES[state.activeView] || VIEW_TITLES.dashboard

  const handleExport = () => {
    const csv = [
      ['Date', 'Description', 'Category', 'Type', 'Amount'],
      ...state.transactions.map((t) => [
        t.date,
        `"${t.description}"`,
        t.category,
        t.type,
        t.type === 'expense' ? -t.amount : t.amount,
      ]),
    ]
      .map((r) => r.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'finvault-transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <header className="header">
      <div className="flex items-center gap-3">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={18} />
        </button>
        <div className="header-left">
          <h1 className="header-title">{title}</h1>
          <p className="header-sub">{sub}</p>
        </div>
      </div>

      <div className="header-right">
        <button className="export-btn" onClick={handleExport} title="Export CSV">
          <Download />
          Export
        </button>
        <button className="icon-btn" title="Notifications">
          <Bell />
        </button>
        <div className="avatar" title="Rajesh V">R</div>
      </div>
    </header>
  )
}
