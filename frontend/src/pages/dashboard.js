import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

import api from '../services/api';

import EnhancedTable from '../components/tableDense';
import Inflows from '../components/inflows';
import Outflows from '../components/outflows';
import Balance from '../components/balance';
import { TransactionsContext } from "../contexts/transactionsContext"

import logo from '../assets/money-white.svg'
import styles from '../styles/dashboard.module.css'


export default function Dashboard() {

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

            <main className={styles.container} >

                <div className={styles.contentDash}>
                <div className={styles.headers}>
                        <header className={styles.headerDash}>
                            <a href="/"><img className={styles.logo} alt="dev.finances" src={logo} /></a>
                            <h1> <a href="/">dev.finances</a></h1>
                        </header>

                        <Balance
                            balances={balances}
                            setIsInflowsActive={setIsInflowsActive}
                            setIsOutflowsActive={setIsOutflowsActive}
                        />
                    </div>

                    <EnhancedTable />


                </div>
            </main>
            <Modal isOpen={isInflowsActive} className={styles.modals} animation={true}>
                    <Inflows />
            </Modal>

            <Modal isOpen={isOutflowsActive} className={styles.modals} animation={true}>
                    <Outflows />
            </Modal>

        </>
    )
}


