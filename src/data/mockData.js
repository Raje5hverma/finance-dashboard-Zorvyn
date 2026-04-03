export const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
]

export const CATEGORY_COLORS = {
  Salary: '#f59e0b',
  Freelance: '#10b981',
  Investment: '#3b82f6',
  'Food & Dining': '#ef4444',
  Shopping: '#8b5cf6',
  Transportation: '#f97316',
  Entertainment: '#ec4899',
  Utilities: '#6b7280',
  Healthcare: '#14b8a6',
  Education: '#0ea5e9',
  Travel: '#a855f7',
  Other: '#78716c',
}

export const initialTransactions = [
  // October 2024
  { id: 1, date: '2024-10-01', description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 2, date: '2024-10-03', description: 'Swiggy Order', category: 'Food & Dining', amount: 450, type: 'expense' },
  { id: 3, date: '2024-10-05', description: 'Metro Card Recharge', category: 'Transportation', amount: 500, type: 'expense' },
  { id: 4, date: '2024-10-07', description: 'Netflix Subscription', category: 'Entertainment', amount: 649, type: 'expense' },
  { id: 5, date: '2024-10-10', description: 'Freelance Project – Logo Design', category: 'Freelance', amount: 12000, type: 'income' },
  { id: 6, date: '2024-10-12', description: 'BigBasket Groceries', category: 'Food & Dining', amount: 2100, type: 'expense' },
  { id: 7, date: '2024-10-15', description: 'Electricity Bill', category: 'Utilities', amount: 1800, type: 'expense' },
  { id: 8, date: '2024-10-18', description: 'Amazon Shopping', category: 'Shopping', amount: 3400, type: 'expense' },
  { id: 9, date: '2024-10-22', description: 'Doctor Consultation', category: 'Healthcare', amount: 800, type: 'expense' },
  { id: 10, date: '2024-10-25', description: 'Dividend – HDFC Fund', category: 'Investment', amount: 4200, type: 'income' },
  { id: 11, date: '2024-10-28', description: 'Ola Ride', category: 'Transportation', amount: 320, type: 'expense' },
  { id: 12, date: '2024-10-30', description: 'Zomato Dinner', category: 'Food & Dining', amount: 780, type: 'expense' },

  // November 2024
  { id: 13, date: '2024-11-01', description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 14, date: '2024-11-04', description: 'Udemy Course – React Advanced', category: 'Education', amount: 1299, type: 'expense' },
  { id: 15, date: '2024-11-06', description: 'Petrol Fill', category: 'Transportation', amount: 2500, type: 'expense' },
  { id: 16, date: '2024-11-08', description: 'Freelance – Web App Development', category: 'Freelance', amount: 25000, type: 'income' },
  { id: 17, date: '2024-11-11', description: 'Gym Membership', category: 'Healthcare', amount: 1500, type: 'expense' },
  { id: 18, date: '2024-11-14', description: 'Reliance Fresh Groceries', category: 'Food & Dining', amount: 1850, type: 'expense' },
  { id: 19, date: '2024-11-18', description: 'Flipkart Big Billion Sale', category: 'Shopping', amount: 8900, type: 'expense' },
  { id: 20, date: '2024-11-20', description: 'Internet Bill', category: 'Utilities', amount: 999, type: 'expense' },
  { id: 21, date: '2024-11-23', description: 'Movie – PVR Cinemas', category: 'Entertainment', amount: 960, type: 'expense' },
  { id: 22, date: '2024-11-27', description: 'SIP – Nifty 50 Index Fund', category: 'Investment', amount: 5000, type: 'expense' },
  { id: 23, date: '2024-11-29', description: 'Rapido Bike Ride', category: 'Transportation', amount: 180, type: 'expense' },

  // December 2024
  { id: 24, date: '2024-12-01', description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 25, date: '2024-12-03', description: 'Year-End Bonus', category: 'Salary', amount: 40000, type: 'income' },
  { id: 26, date: '2024-12-05', description: 'Goa Trip – Flights', category: 'Travel', amount: 8400, type: 'expense' },
  { id: 27, date: '2024-12-07', description: 'Goa Trip – Hotel', category: 'Travel', amount: 12000, type: 'expense' },
  { id: 28, date: '2024-12-10', description: 'Christmas Shopping – Myntra', category: 'Shopping', amount: 4500, type: 'expense' },
  { id: 29, date: '2024-12-15', description: 'Electricity Bill', category: 'Utilities', amount: 2100, type: 'expense' },
  { id: 30, date: '2024-12-18', description: 'Restaurant – Birthday Dinner', category: 'Food & Dining', amount: 3200, type: 'expense' },
  { id: 31, date: '2024-12-22', description: 'Freelance – UI Design Sprint', category: 'Freelance', amount: 18000, type: 'income' },
  { id: 32, date: '2024-12-27', description: 'New Year Party Tickets', category: 'Entertainment', amount: 2500, type: 'expense' },

  // January 2025
  { id: 33, date: '2025-01-01', description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 34, date: '2025-01-04', description: 'Grocery – DMart', category: 'Food & Dining', amount: 2400, type: 'expense' },
  { id: 35, date: '2025-01-06', description: 'Medicine Purchase', category: 'Healthcare', amount: 650, type: 'expense' },
  { id: 36, date: '2025-01-09', description: 'SIP – Nifty 50 Index Fund', category: 'Investment', amount: 5000, type: 'expense' },
  { id: 37, date: '2025-01-12', description: 'Uber Ride – Airport', category: 'Transportation', amount: 850, type: 'expense' },
  { id: 38, date: '2025-01-15', description: 'Freelance – Branding Project', category: 'Freelance', amount: 30000, type: 'income' },
  { id: 39, date: '2025-01-18', description: 'Amazon Prime Annual', category: 'Entertainment', amount: 1499, type: 'expense' },
  { id: 40, date: '2025-01-20', description: 'Water Bill', category: 'Utilities', amount: 350, type: 'expense' },
  { id: 41, date: '2025-01-24', description: 'Weekend Outing – Food', category: 'Food & Dining', amount: 1200, type: 'expense' },
  { id: 42, date: '2025-01-28', description: 'Stock Dividend – TCS', category: 'Investment', amount: 6800, type: 'income' },

  // February 2025
  { id: 43, date: '2025-02-01', description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 44, date: '2025-02-03', description: 'Valentine's Day Gift', category: 'Shopping', amount: 2800, type: 'expense' },
  { id: 45, date: '2025-02-07', description: 'Grocery – BigBasket', category: 'Food & Dining', amount: 1950, type: 'expense' },
  { id: 46, date: '2025-02-10', description: 'Freelance – App UI Kit', category: 'Freelance', amount: 15000, type: 'income' },
  { id: 47, date: '2025-02-12', description: 'Electricity Bill', category: 'Utilities', amount: 1650, type: 'expense' },
  { id: 48, date: '2025-02-15', description: 'Online Course – DSA', category: 'Education', amount: 2999, type: 'expense' },
  { id: 49, date: '2025-02-18', description: 'Petrol Fill', category: 'Transportation', amount: 2200, type: 'expense' },
  { id: 50, date: '2025-02-22', description: 'Gaming – Steam Purchase', category: 'Entertainment', amount: 1800, type: 'expense' },
  { id: 51, date: '2025-02-24', description: 'SIP – Nifty 50 Index Fund', category: 'Investment', amount: 5000, type: 'expense' },
  { id: 52, date: '2025-02-27', description: 'Dental Check-up', category: 'Healthcare', amount: 1200, type: 'expense' },

  // March 2025
  { id: 53, date: '2025-03-01', description: 'Monthly Salary', category: 'Salary', amount: 85000, type: 'income' },
  { id: 54, date: '2025-03-03', description: 'Holi Party – Food & Drinks', category: 'Food & Dining', amount: 1800, type: 'expense' },
  { id: 55, date: '2025-03-05', description: 'Freelance – Dashboard Project', category: 'Freelance', amount: 35000, type: 'income' },
  { id: 56, date: '2025-03-08', description: 'New Shoes – Nike', category: 'Shopping', amount: 5500, type: 'expense' },
  { id: 57, date: '2025-03-12', description: 'Internet + Cable Bill', category: 'Utilities', amount: 1499, type: 'expense' },
  { id: 58, date: '2025-03-15', description: 'Cab – Outstation Trip', category: 'Transportation', amount: 3200, type: 'expense' },
  { id: 59, date: '2025-03-18', description: 'Concert Tickets', category: 'Entertainment', amount: 3500, type: 'expense' },
  { id: 60, date: '2025-03-20', description: 'SIP – Nifty 50 Index Fund', category: 'Investment', amount: 5000, type: 'expense' },
  { id: 61, date: '2025-03-23', description: 'Pharmacy – Vitamins', category: 'Healthcare', amount: 890, type: 'expense' },
  { id: 62, date: '2025-03-25', description: 'Mutual Fund Returns', category: 'Investment', amount: 9200, type: 'income' },
  { id: 63, date: '2025-03-28', description: 'Weekend Restaurant', category: 'Food & Dining', amount: 2100, type: 'expense' },
  { id: 64, date: '2025-03-31', description: 'Grocery – Final March', category: 'Food & Dining', amount: 2300, type: 'expense' },
]

export const getMonthlyData = (transactions) => {
  const months = {}
  transactions.forEach((t) => {
    const month = t.date.substring(0, 7)
    if (!months[month]) {
      months[month] = { month, income: 0, expenses: 0, balance: 0 }
    }
    if (t.type === 'income') months[month].income += t.amount
    else months[month].expenses += t.amount
  })
  return Object.values(months)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m) => ({
      ...m,
      balance: m.income - m.expenses,
      label: new Date(m.month + '-01').toLocaleString('default', { month: 'short', year: '2-digit' }),
    }))
}

export const getCategoryBreakdown = (transactions) => {
  const cats = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      cats[t.category] = (cats[t.category] || 0) + t.amount
    })
  return Object.entries(cats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}
