import React, { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Lightbulb, TrendingUp, TrendingDown, Star, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getMonthlyData, getCategoryBreakdown, CATEGORY_COLORS } from '../data/mockData'

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN')
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 14px',
      fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill || p.color, marginBottom: 2 }}>
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function Insights() {
  const { state } = useApp()
  const { transactions } = state

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions])
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions])

  const {
    totalIncome,
    totalExpenses,
    savingsRate,
    avgMonthlyIncome,
    avgMonthlyExpense,
    highestExpenseMonth,
    topCategory,
    observations,
    lastTwo,
  } = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0
    const avgMonthlyIncome = monthlyData.length ? (totalIncome / monthlyData.length) : 0
    const avgMonthlyExpense = monthlyData.length ? (totalExpenses / monthlyData.length) : 0

    const highestExpenseMonth = [...monthlyData].sort((a, b) => b.expenses - a.expenses)[0]
    const topCategory = categoryBreakdown[0]

    const lastTwo = monthlyData.slice(-2)

    const observations = []
    if (topCategory) {
      observations.push({
        icon: Star,
        color: 'var(--accent-gold)',
        text: `Your highest spending category is ${topCategory.name} at ${fmt(topCategory.value)} total.`,
      })
    }
    if (lastTwo.length === 2) {
      const diff = lastTwo[1].expenses - lastTwo[0].expenses
      const pct = lastTwo[0].expenses ? Math.abs((diff / lastTwo[0].expenses) * 100).toFixed(0) : 0
      if (diff > 0) {
        observations.push({
          icon: TrendingUp,
          color: 'var(--accent-red)',
          text: `Expenses rose ${pct}% from ${lastTwo[0].label} to ${lastTwo[1].label}. Consider reviewing spending.`,
        })
      } else if (diff < 0) {
        observations.push({
          icon: TrendingDown,
          color: 'var(--accent-green)',
          text: `Great news — expenses dropped ${pct}% from ${lastTwo[0].label} to ${lastTwo[1].label}!`,
        })
      }
    }
    if (Number(savingsRate) >= 30) {
      observations.push({
        icon: Lightbulb,
        color: 'var(--accent-blue)',
        text: `You have a strong ${savingsRate}% savings rate. Consider investing the surplus in index funds.`,
      })
    } else if (Number(savingsRate) < 15) {
      observations.push({
        icon: AlertCircle,
        color: 'var(--accent-red)',
        text: `Your savings rate is ${savingsRate}%. Aim for 20–30% by reducing discretionary spending.`,
      })
    }

    return { totalIncome, totalExpenses, savingsRate, avgMonthlyIncome, avgMonthlyExpense, highestExpenseMonth, topCategory, observations, lastTwo }
  }, [transactions, monthlyData, categoryBreakdown])

  const maxCatValue = categoryBreakdown[0]?.value || 1
  const maxBarVal = Math.max(...monthlyData.map(m => Math.max(m.income, m.expenses)), 1)

  if (transactions.length === 0) {
    return (
      <div className="empty-state" style={{ paddingTop: 80 }}>
        <Lightbulb />
        <p>Add some transactions to see insights.</p>
      </div>
    )
  }

  return (
    <div>
      {/* KPI Row */}
      <div className="insights-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="insight-card">
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            Savings Rate
          </div>
          <div className="insight-number" style={{ color: Number(savingsRate) >= 20 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {savingsRate}%
          </div>
          <div className="insight-sub">of total income saved</div>
        </div>

        <div className="insight-card">
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            Avg Monthly Income
          </div>
          <div className="insight-number" style={{ color: 'var(--accent-green)' }}>
            {fmt(Math.round(avgMonthlyIncome))}
          </div>
          <div className="insight-sub">over {monthlyData.length} months</div>
        </div>

        <div className="insight-card">
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            Avg Monthly Expense
          </div>
          <div className="insight-number" style={{ color: 'var(--accent-red)' }}>
            {fmt(Math.round(avgMonthlyExpense))}
          </div>
          <div className="insight-sub">over {monthlyData.length} months</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 20 }}>
        {/* Monthly Comparison Bar Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Monthly Income vs Expenses</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
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
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="income" name="income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={36} />
              <Bar dataKey="expenses" name="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Spending Categories */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Top Spending Categories</span>
          </div>
          <div className="top-cat-list">
            {categoryBreakdown.slice(0, 7).map((cat, i) => (
              <div key={cat.name} className="top-cat-row">
                <span className="top-cat-rank">#{i + 1}</span>
                <div className="top-cat-info">
                  <div className="top-cat-name" style={{ color: CATEGORY_COLORS[cat.name] || 'var(--text-primary)' }}>
                    {cat.name}
                  </div>
                  <div className="top-cat-bar-wrap">
                    <div
                      className="top-cat-bar"
                      style={{
                        width: `${(cat.value / maxCatValue) * 100}%`,
                        background: CATEGORY_COLORS[cat.name] || '#6b7280',
                      }}
                    />
                  </div>
                </div>
                <span className="top-cat-amount">{fmt(cat.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Detailed Comparison */}
      {lastTwo.length === 2 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <span className="card-title">Month-over-Month Comparison</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {lastTwo[0].label} vs {lastTwo[1].label}
            </span>
          </div>
          <div className="monthly-compare">
            {['income', 'expenses'].map((key) => {
              const max = Math.max(lastTwo[0][key], lastTwo[1][key], 1)
              return (
                <div key={key}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                    {key}
                  </div>
                  {lastTwo.map((m) => (
                    <div key={m.label} className="compare-row">
                      <span className="compare-label">{m.label}</span>
                      <div className="compare-bar-wrap">
                        <div
                          className={`compare-bar ${key}`}
                          style={{ width: `${(m[key] / max) * 100}%` }}
                        />
                      </div>
                      <span className="compare-val">{fmt(m[key])}</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Observations */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Smart Observations</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {observations.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Add more transactions to generate insights.</p>
          ) : (
            observations.map((obs, i) => {
              const Icon = obs.icon
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `3px solid ${obs.color}`,
                }}>
                  <Icon size={16} style={{ color: obs.color, flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{obs.text}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
