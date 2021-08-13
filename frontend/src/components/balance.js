import React from "react";

import add from '../assets/add-button.svg'
import remove from '../assets/remove-button.svg'
import coin from '../assets/coin.svg'
import styles from '../styles/balance.module.css'

function Balance({ balances, setIsInflowsActive, setIsOutflowsActive }) {
  return (
    <div className={styles.totals} >

      <div className={styles.balanceItem}
        onClick={() => setIsInflowsActive(true)
          //submitIncome
        }>
        <div className={styles.itemHeader} >
          <h2>Entradas</h2>
          <img alt="Adicionar Receita"
            src={add}
            className={styles.buttons}

          />
        </div>
        <p>{balances.total_inflow
          ? balances.total_inflow.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          : 'R$ 0,00'}
        </p>
      </div>

      <div className={styles.balanceItem}
        onClick={() => setIsOutflowsActive(true)} >

        <div className={styles.itemHeader} >
          <h2>Saídas</h2>
          <img alt="Adicionar Despesa"
            src={remove}
            className={styles.buttons}

          />
        </div>
        <p>
          {balances.total_outflow
            ? balances.total_outflow.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : 'R$ 0,00'}
        </p>
      </div>

      <div className={styles.balanceTotal} >
        <div className={styles.itemHeader} >
          <h2>Total</h2>
          <img alt="Balanço" src={coin} className={styles.buttonTotal} />
        </div>
        <p>
          {balances.total_balance
            ? balances.total_balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : 'R$ 0,00'}
        </p>
      </div>
    </div>
  );
}

export default Balance;
