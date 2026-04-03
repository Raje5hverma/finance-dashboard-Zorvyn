import React, { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getMonthlyData, getCategoryBreakdown, CATEGORY_COLORS } from '../data/mockData'

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN')
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 12px',
      fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-primary)' }}>{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill, fontFamily: 'var(--font-mono)' }}>
        {fmt(payload[0].value)}
      </p>
    </div>
  )
}

export default function Dashboard() {
  const { state } = useApp()
  const { transactions } = state

  const { totalBalance, totalIncome, totalExpenses, savings } = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return {
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses,
      savings: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0,
    }
  }, [transactions])

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions])
  const categoryData = useMemo(() => getCategoryBreakdown(transactions).slice(0, 6), [transactions])

  // Running balance for area chart
  const areaData = useMemo(() => {
    let running = 0
    return monthlyData.map((m) => {
      running += m.balance
      return { ...m, runningBalance: running }
    })
  }, [monthlyData])

  const summaryCards = [
    {
      key: 'balance',
      label: 'Total Balance',
      value: fmt(totalBalance),
      icon: Wallet,
      change: savings + '% savings rate',
      changeType: totalBalance >= 0 ? 'up' : 'down',
    },
    {
      key: 'income',
      label: 'Total Income',
      value: fmt(totalIncome),
      icon: TrendingUp,
      change: '₹' + (totalIncome / 6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + ' avg/month',
      changeType: 'up',
    },
    {
      key: 'expenses',
      label: 'Total Expenses',
      value: fmt(totalExpenses),
      icon: TrendingDown,
      change: '₹' + (totalExpenses / 6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + ' avg/month',
      changeType: 'down',
    },
  ]

  return (
    <div>
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryCards.map(({ key, label, value, icon: Icon, change, changeType }) => (
          <div key={key} className={`summary-card ${key}`}>
            <div className={`summary-icon ${key}`}>
              <Icon />
            </div>
            <div className="summary-label">{label}</div>
            <div className="summary-amount">{value}</div>
            <div className={`summary-change ${changeType}`}>
              {changeType === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              {change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Balance Trend */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Balance Trend</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>6 months</span>
          </div>
          {areaData.length === 0 ? (
            <div className="empty-state">
              <TrendingUp />
              <p>No data to display</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={areaData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => '₹' + (v / 1000).toFixed(0) + 'k'}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#incomeGrad)"
                  dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#expenseGrad)"
                  dot={{ fill: '#ef4444', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spending Breakdown */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Spending Breakdown</span>
          </div>
          {categoryData.length === 0 ? (
            <div className="empty-state">
              <PiggyBank />
              <p>No expense data</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={64}
                  outerRadius={96}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || '#6b7280'}
                      opacity={0.9}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={7}
                  formatter={(v) => (
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {v}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Transactions</span>
          <button
            style={{ fontSize: 12, color: 'var(--accent-gold)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => {}}
          >
            View all →
          </button>
        </div>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <ArrowUpRight />
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 8).map((t) => (
                  <tr key={t.id}>
                    <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>
                    <td style={{ maxWidth: 240 }}>
                      <span style={{ fontSize: 13 }}>{t.description}</span>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
