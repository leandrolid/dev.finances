import React, { useEffect, useState } from 'react';

import './style.css'
import logo from '../../assets/money-white.svg'

import api from '../../services/api';
//import DataTable from './table';
import EnhancedTable from './tableDense';

export default function Dashboard(){
    // eslint-disable-next-line
    const [ incomes, setIncomes ] = useState([])
    // eslint-disable-next-line
    const [ outcomes, setOutcomes ] = useState([])
    const [ balances, setBalances ] = useState({})
 
    //console.log(incomes)
    //console.log(outcomes)
    //console.log(balances)

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
            
            <main className="container" >
                <div className="content content-dash">
                    <div className="headers">
                        <header className="header-dash">
                            <img className="logo" alt="dev.finances" src={logo}/>
                            <h1>dev.finances</h1>
                        </header>

                        <div className="totals" >                            

                            <div className="balance-item" >
                                <h2>Entradas</h2>
                                <p>R$ {balances.total_inflow},00</p>
                            </div>

                            <div className="balance-item" >
                                <h2>Saídas</h2>
                                <p>R$ {balances.total_outflow},00</p>
                            </div>

                            <div className="balance-item balance-total" >
                                <h2>Total</h2>
                                <p>R$ {balances.total_balance},00</p>
                            </div>
                        </div>
                    </div>

                    <EnhancedTable/>
                    

                    
                </div>
            </main>            
        </>
    )
}