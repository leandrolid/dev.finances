import React, { useState } from 'react';

import api from '../../services/api'

import './style.css'
import logo from '../../assets/money.svg'

export default function Inflows(){

    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        
        const user_id = localStorage.getItem('user')

        //const response = 
        await api.post('/outflow', { price, description }, { headers: { user_id } })



        //console.log(response)
        //console.log(price)
        //console.log(description)

        //history.push('/')

    }

    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <>
            <div className="container container-modal">
                <div className="inner">
                    <header id="header">
                        <img className="logo" alt="dev.finances" src={logo}/>
                        <h1>Adicionar Despesa</h1>
                    </header>
                    <section className="content">
                        <form onSubmit={handleSubmit} >
                            <label className="label" >Descrição: *</label>

                            <input 
                            id="description"
                            type="text"
                            placeholder="Descrição da despesa" 
                            //data-rules="required"
                            autoFocus
                            required={true}
                            className="input"
                            value={description}
                            onChange={ event => setDescription(event.target.value)} />

                            <label className="label" >Valor: *</label>

                            <input 
                            id="price"
                            type="number"
                            placeholder="R$ 0,00" 
                            required={true}
                            className="input"
                            value={price < 0 ? (price * -1) : price}
                            onChange={ event => setPrice(event.target.value)} />

                            <button 
                            type="submit" 
                            className="button"
                            onClick={description && price ? refreshPage : null}>Enviar</button>
                        </form>
                        
                    </section>
                </div>
            
            </div>
            
        </>
    )
}