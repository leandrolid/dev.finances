import React from 'react'

import './App.css'
import Routes from './routes'

import logo from './assets/money.svg'

function App() {
  return (
    <div className="container">
      <header className="header">
        <img className="logo" alt="dev.finances" src={logo}/>
        <h1>dev.finances</h1>
      </header>
      <section className="content" >
        <Routes />
        
      </section>
      
    </div>
  )
}

export default App
