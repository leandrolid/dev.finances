import React, { useState } from 'react';

import api from '../../services/api'

export default function Login({ history }){
    const [ email, setEmail ] = useState('')

    async function handleSubmit(event){
      event.preventDefault()
  
      const response = await api.post('/sessions', { email })
  
      const { _id } = response.data
  
      localStorage.setItem( 'user', _id )

      history.push('/dashboard')
  
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <label className="label" >E-MAIL: *</label>

                <input 
                id="email"
                type="email"
                placeholder="Seu melhor e-mail" 
                data-rules="required"
                autoFocus
                className="input"
                value={email}
                onChange={ event => setEmail(event.target.value)} />

                <button 
                type="submit" 
                className="button">Entrar</button>
        </form>
        </>
    )
}