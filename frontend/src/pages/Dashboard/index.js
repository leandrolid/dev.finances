import React, { useEffect, useState } from 'react';

import './style.css'
import logo from '../../assets/money.svg'

import api from '../../services/api';

export default function Dashboard(){
    const [ incomes, setIncomes ] = useState([])
    const [ outcomes, setOutcomes ] = useState([])
    const [ balances, setBalances ] = useState({})
 
    console.log(incomes)
    console.log(outcomes)
    console.log(balances)


    useEffect(() => {
        async function loadBalance(){
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', { headers: { user_id } })
            setBalances(response.data);
                        
            //console.log(response.data)            
        }
        loadBalance()
    }, [])

    useEffect(() => {
        async function loadInflows(){
            const user_id = localStorage.getItem('user')
            const inflows = await api.get('/inflow', {
                headers: { user_id }
            })            
            setIncomes(inflows.data);            
            //console.log(Infows.data)            
        }
        loadInflows()
    }, [])

    useEffect(() => {
        async function loadOutflows(){
            const user_id = localStorage.getItem('user')
            const outflows = await api.get('/outflow', {
                headers: { user_id }
            })            
            setOutcomes(outflows.data);            
            //console.log(outfows.data)            
        }
        loadOutflows()
    }, [])



    return (
        <>
            <header className="header-dash">
                <img className="logo" alt="dev.finances" src={logo}/>
                <h1>dev.finances</h1>
            </header>
            <section className="balances" >
                <div className="content-dash">
                    <div>
                        <h2>Entradas</h2>
                        <p>{balances.total_inflow}</p>
                    </div>

                    <div>
                        <h2>Saídas</h2>
                        <p>{balances.total_outflow}</p>
                    </div>

                    <div>
                        <h2>Total</h2>
                        <p>{balances.total_balance}</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomes.map(income => (
                                <tr key={income._id}>
                                    <td>{income.description}</td>
                                    <td>{income.price.toFixed(2).replace(".", ",")}</td>
                                    <td>{income.date}</td>

                                </tr>
                            ))}
                            {outcomes.map(outcome => (
                                <tr key={outcome._id}>
                                    <td>{outcome.description}</td>
                                    <td>{outcome.price.toFixed(2).replace(".", ",")}</td>
                                    <td>{outcome.date}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table> 
                </div>
            </section>
            
        </>
    )
}