import React, { useState } from 'react';

import api from '../../services/api'

import './style.css'
import logo from '../../assets/money.svg'

export default function Inflows({ history }){

    const [ inflow, setInflow ] = useState('')

    async function handleSubmit(event){
      event.preventDefault()
  
      const response = await api.post('/inflow', { description, price })
  
      const { _id } = response.data
  
      localStorage.setItem( 'user', _id )

      history.push('/dashboard')
  
    }

    return (
        <>
            <div className="container">
                <div className="inner">
                    <header id="header">
                        <img className="logo" alt="dev.finances" src={logo}/>
                        <h1>dev.finances</h1>
                    </header>
                    <section className="content">
                        <form onSubmit={handleSubmit} >
                            <label className="label" >E-MAIL: *</label>

                            <input 
                            id="email"
                            type="email"
                            placeholder="Seu melhor e-mail" 
                            data-rules="required"
                            autoFocus
                            className="input"
                            value={''}
                            onChange={ event => setInflow(event.target.value)} />

                            <button 
                            type="submit" 
                            className="button">Entrar</button>
                        </form>
                        
                    </section>
                </div>
            
            </div>
            
        </>
    )
}