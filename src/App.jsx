import React, { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Insights from './components/Insights'
import { useApp } from './context/AppContext'

function AppContent() {
  const { state } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderView = () => {
    switch (state.activeView) {
      case 'dashboard': return <Dashboard />
      case 'transactions': return <Transactions />
      case 'insights': return <Insights />
      default: return <Dashboard />
    }
  }

  return (
    <div className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-area">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="content">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
