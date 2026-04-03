import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { initialTransactions } from '../data/mockData'

const AppContext = createContext(null)

const STORAGE_KEY = 'finvault_data'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

const initialState = loadState() || {
  transactions: initialTransactions,
  role: 'admin', // 'admin' | 'viewer'
  activeView: 'dashboard',
  darkMode: true,
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date_desc',
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'SET_VIEW':
      return { ...state, activeView: action.payload }
    case 'TOGGLE_DARK':
      return { ...state, darkMode: !state.darkMode }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'ADD_TRANSACTION': {
      const newT = { ...action.payload, id: Date.now() }
      return { ...state, transactions: [newT, ...state.transactions] }
    }
    case 'UPDATE_TRANSACTION': {
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      }
    }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    saveState(state)
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
