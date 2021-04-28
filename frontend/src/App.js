import React from 'react'
import { TransactionsProvider } from './contexts/transactionsContext'

import Routes from './routes'

function App() {
  return (
    <TransactionsProvider>
      <Routes />
    </TransactionsProvider>)
}

export default App
