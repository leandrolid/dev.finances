import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import api from '../../services/api';

//import { incomes } from './index';

//console.log(incomes)

export default function DataTable() {

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

    const columns = [
        { field: 'descricao', headerName: 'Descrição', type: 'string', width: '33%' },
        { field: 'valor', headerName: 'Valor', type: 'number', width: '33%' },
        { field: 'data', headerName: 'Data', width: '33%' }
      ]
      
      const rows = incomes.map(income => ({
            id: income._id, 
            descricao: income.description, 
            valor: income.price, 
            data: income.date,
            width: '33%'
        }))

  return (
    <div style={{ height: 400, width: '100%', backgroundColor: '#FFF', }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}