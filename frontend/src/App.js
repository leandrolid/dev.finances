import React from 'react'

import { TransactionsProvider } from './contexts/transactionsContext'
import Routes from './routes'
import './styles/globals.css'

function App() {
  return (
    <TransactionsProvider>
      <Routes />
    </TransactionsProvider>)
}

export default App
