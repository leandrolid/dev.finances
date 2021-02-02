import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import './style.css'
import logo from '../../assets/money-white.svg'
import add from '../../assets/add-button.svg'
import remove from '../../assets/remove-button.svg'
import coin from '../../assets/coin.svg'
import close from '../../assets/close.svg'

import api from '../../services/api';
import EnhancedTable from '../Table/tableDense';
import Inflows from '../Inflows/index';
import Outflows from '../Outflows/index';
//import DataTable from './table';
//import Transactions from '../Transactions/index'




export default function Dashboard({ history }){

    //async function submitIncome(event){
        //event.preventDefault()
    
        //const response = await api.post('/sessions', { email })
  
        //history.push('/inflow')
    //}

    const [ inc, setInc] = useState(false)
    const [ out, setOut] = useState(false)



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
                        
            //console.log(response)            
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

    //async function handleAdd(event){ event.preventDefault()}

    /* const modals = {
        root: {
          fontFamily: 'Roboto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor: '#000000',
          color: '#00000080'
        },      
      }
      */


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
                                <div className="item-header" >
                                    <h2>Entradas</h2>
                                    <img alt="Adicionar Receita" 
                                    src={add} 
                                    className="buttons"
                                    onClick={ () => setInc(true)
                                        //submitIncome
                                    }                                 
                                    />
                                </div>
                                <p>R$ {balances.total_inflow},00</p>
                            </div>

                            <div className="balance-item" >
                                <div className="item-header" >
                                    <h2>Saídas</h2>
                                    <img alt="Adicionar Despesa" 
                                    src={remove} 
                                    className="buttons"
                                    onClick={ () => setOut(true)}
                                     />
                                </div>
                                <p>R$ {balances.total_outflow},00</p>
                            </div>

                            <div className="balance-item balance-total" >
                                <div className="item-header" >
                                    <h2>Total</h2>
                                    <img alt="Balanço" src={coin} className="buttons button-total" />
                                </div>
                                <p>R$ {balances.total_balance},00</p>
                            </div>
                        </div>
                    </div>

                    <EnhancedTable/>
                    
                    
                </div>
            </main>
            <Modal 
            isOpen={inc} 
            className="modals"
            animation={true}
            >
                <div className="overlay">
                    
                    <img alt="Fechar" title="Fechar" src={close} className="modals-close"
                    onClick={ () => setInc(false)} />

                    <Inflows />
                </div>
                
            </Modal>

            <Modal isOpen={out} className="modals" >
                <div className="overlay">

                    <img alt="Fechar" title="Fechar" src={close} className="modals-close" 
                    onClick={ () => setOut(false)} />

                    <Outflows />
                </div>
            </Modal>
        
        </>
    )
}


