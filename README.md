# FinVault — Finance Dashboard

A clean, interactive personal finance dashboard built with React + Vite.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

---

## Project Structure

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx        # Main dashboard with summary + charts
│   │   ├── Header.jsx           # Top nav bar with export button
│   │   ├── Insights.jsx         # Insights & analysis view
│   │   ├── Sidebar.jsx          # Navigation + role switcher
│   │   ├── Transactions.jsx     # Full transactions table with CRUD
│   │   └── TransactionModal.jsx # Add / Edit transaction modal
│   ├── context/
│   │   └── AppContext.jsx       # Global state via useReducer + localStorage
│   ├── data/
│   │   └── mockData.js          # 64 mock transactions across 6 months
│   ├── App.jsx                  # Root component + view routing
│   ├── index.css                # Design system (CSS variables + global styles)
│   └── main.jsx                 # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## Features

### Dashboard Overview
- **Summary Cards** — Total Balance, Total Income, Total Expenses with trend indicators
- **Balance Trend** — Area chart showing monthly income vs. expenses over 6 months (Recharts)
- **Spending Breakdown** — Donut/pie chart of top expense categories
- **Recent Transactions** — Quick preview of the 8 latest transactions

### Transactions
- Full paginated table (12 per page) of all 64+ transactions
- **Search** — Filter by description or category
- **Type filter** — Income / Expense / All
- **Category filter** — All 12 categories
- **Sort** — Date ascending/descending, Amount ascending/descending
- **Add / Edit / Delete** — Admin role only (modal with validation)
- Column header click to sort

### Role-Based UI
Switch roles via the dropdown in the sidebar:
| Role | Permissions |
|------|-------------|
| **Admin** | View + Add + Edit + Delete transactions |
| **Viewer** | Read-only; action buttons hidden; info banner shown |

No backend needed — role state is managed entirely on the frontend.

### Insights
- **KPI row** — Savings Rate, Avg Monthly Income, Avg Monthly Expense
- **Monthly Bar Chart** — Side-by-side income vs. expenses per month
- **Top Spending Categories** — Ranked list with proportional bars
- **Month-over-Month Comparison** — Last two months compared visually
- **Smart Observations** — Auto-generated text insights (highest category, spending trend, savings advice)

### State Management
All state is managed with React's `useReducer` in `AppContext.jsx`:
- Transactions data
- Active view / navigation
- Role (admin / viewer)
- Filter & sort state
- **localStorage persistence** — state survives page refreshes automatically

### Extras
- **CSV Export** — Header button exports all transactions as a `.csv` file
- **Dark theme** — Full dark luxury design out of the box
- **Responsive** — Works on mobile, tablet, desktop; sidebar collapses on small screens
- **Empty states** — All views handle zero-data gracefully
- **Keyboard** — Escape closes modals

---

## Design Approach

**Theme:** Dark luxury fintech — inspired by private banking interfaces.  
**Colors:** Deep slate backgrounds (`#080c14`) with amber/gold accents (`#f59e0b`) and semantic green/red for income/expense.  
**Typography:** `Syne` (headings) + `DM Sans` (body) + `DM Mono` (numbers/amounts).  
**Charts:** Recharts with custom styled tooltips matching the dark theme.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Recharts | Charts (AreaChart, BarChart, PieChart) |
| Lucide React | Icons |
| CSS Variables | Design tokens / theming |
| useReducer + Context | Global state management |
| localStorage | Data persistence |

---

## Assumptions

1. All amounts are in Indian Rupees (₹).
2. Six months of mock data (Oct 2024 – Mar 2025) are pre-loaded.
3. Role switching is frontend-only (no auth/backend required per spec).
4. "Savings" is defined as `Income − Expenses`; savings rate = `savings / income × 100`.
5. SIP investments are treated as expenses since they leave the current account.

---

## Submission Checklist

- [x] Dashboard overview (summary cards + 2 chart types)
- [x] Transactions section (list + filter + sort + search)
- [x] Role-based UI (Admin vs Viewer)
- [x] Insights section (top category, monthly comparison, observations)
- [x] State management (useReducer + Context)
- [x] Responsive design
- [x] Empty state handling
- [x] CSV export (bonus)
- [x] localStorage persistence (bonus)
- [x] Documentation (this README)
