import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

import '../styles/dashboard.css'
import logo from '../assets/money-white.svg'
import add from '../assets/add-button.svg'
import remove from '../assets/remove-button.svg'
import coin from '../assets/coin.svg'
import close from '../assets/close.svg'

import api from '../services/api';
import EnhancedTable from '../components/tableDense';
import Inflows from '../components/inflows';
import Outflows from '../components/outflows';
//import DataTable from './table';
//import Transactions from '../Transactions/index'

import { TransactionsContext, TransactionsProvider } from "../contexts/transactionsContext"


export default function Dashboard({ history }) {

    const { tableUpdate,
        isInflowsActive,
        isOutflowsActive,
        setIsInflowsActive,
        setIsOutflowsActive } = useContext(TransactionsContext)

    // eslint-disable-next-line
    const [, setIncomes] = useState([])
    // eslint-disable-next-line
    const [, setOutcomes] = useState([])
    const [balances, setBalances] = useState({})

    //console.log(incomes)
    //console.log(outcomes)
    //console.log(balances)

    useEffect(() => {
        async function loadBalance() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', { headers: { user_id } })
            setBalances(response.data);

            //console.log(response)            
        }
        loadBalance()
    }, [tableUpdate])

    useEffect(() => {
        async function loadInflows() {
            const user_id = localStorage.getItem('user')
            const inflows = await api.get('/inflow', {
                headers: { user_id }
            })
            setIncomes(inflows.data);
            //console.log(Infows.data)            
        }
        loadInflows()
    }, [tableUpdate])

    useEffect(() => {
        async function loadOutflows() {
            const user_id = localStorage.getItem('user')
            const outflows = await api.get('/outflow', {
                headers: { user_id }
            })
            setOutcomes(outflows.data);
            //console.log(outfows.data)            
        }
        loadOutflows()
    }, [tableUpdate])

    return (
        <>

            <main className="container" >

                <div className="content content-dash">
                    <div className="headers">
                        <header className="header-dash">
                            <a href="/"><img className="logo" alt="dev.finances" src={logo} /></a>
                            <h1> <a href="/">dev.finances</a></h1>
                        </header>

                        <div className="totals" >

                            <div className="balance-item"
                                onClick={() => setIsInflowsActive(true)
                                    //submitIncome
                                }>
                                <div className="item-header" >
                                    <h2>Entradas</h2>
                                    <img alt="Adicionar Receita"
                                        src={add}
                                        className="buttons"

                                    />
                                </div>
                                <p>R$ {balances.total_inflow ? balances.total_inflow : '0'},00</p>
                            </div>

                            <div className="balance-item"
                                onClick={() => setIsOutflowsActive(true)} >

                                <div className="item-header" >
                                    <h2>Saídas</h2>
                                    <img alt="Adicionar Despesa"
                                        src={remove}
                                        className="buttons"

                                    />
                                </div>
                                <p>R$ {balances.total_outflow ? balances.total_outflow : '0'},00</p>
                            </div>

                            <div className="balance-item balance-total" >
                                <div className="item-header" >
                                    <h2>Total</h2>
                                    <img alt="Balanço" src={coin} className="buttons button-total" />
                                </div>
                                <p>R$ {balances.total_balance ? balances.total_balance : '0'},00</p>
                            </div>
                        </div>
                    </div>

                    <EnhancedTable />


                </div>
            </main>
            <Modal
                isOpen={isInflowsActive}
                className="modals"
                animation={true}
            >
                <div className="overlay">

                    <img alt="Fechar" title="Fechar" src={close} className="modals-close"
                        onClick={() => setIsInflowsActive(false)} />

                    <Inflows />
                </div>

            </Modal>

            <Modal isOpen={isOutflowsActive} className="modals" >
                <div className="overlay">

                    <img alt="Fechar" title="Fechar" src={close} className="modals-close"
                        onClick={() => setIsOutflowsActive(false)} />

                    <Outflows />
                </div>
            </Modal>

        </>
    )
}


