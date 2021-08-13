import React, { useContext, useState } from 'react';
import { createHashHistory } from 'history'

import api from '../services/api'
import { TransactionsContext } from '../contexts/transactionsContext';

import logo from '../assets/money.svg'
import close from '../assets/close.svg'

import styles from '../styles/inflows.module.css'

export const history = createHashHistory()

export default function Inflows() {
    const { setIsInflowsActive, setTableUpdate, tableUpdate } = useContext(TransactionsContext)

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        const user_id = localStorage.getItem('user');
        await api.post('/inflow', { price, description }, { headers: { user_id } });
        setTableUpdate(tableUpdate + 1);
        setIsInflowsActive(false);
        
    }

    function handleChangePrice({ target }) {
        const dottedPrice = target.value.replace(',', '.');
        setPrice(dottedPrice);
    }

    // async function refreshPage() {
    //     //console.log(price)
    //     //console.log(description)
    //     //const response = 
    // }

    return (
        <>
            <div className={styles.containerModal}>
            <div className={styles.inner}>
                    <header id="header">
                    <img className={styles.logo} alt="dev.finances" src={logo} />
                        <img
                        alt="Fechar"
                        title="Fechar"
                        src={close}
                        className={styles.modalsClose}
                        onClick={() => setIsInflowsActive(false)}
                        />
                        <h1>Adicionar Receita</h1>
                    </header>
                <section className={styles.content}>
                        <form onSubmit={description && price ? handleSubmit : null} >
                        <label className={styles.label} >Descrição: *</label>

                            <input
                                id="description"
                                type="text"
                                placeholder="Descrição da receita"
                                //data-rules="required"
                                autoFocus
                                required={true}
                            className={styles.input}
                                value={description}
                                onChange={event => setDescription(event.target.value)} />

                        <label className={styles.label} >Valor: *</label>

                            <input
                                id="price"
                                type="text"
                                placeholder="R$ 0,00"
                                required={true}
                                className={styles.input}
                                value={price < 0 ? 0 : price}
                                onChange={(event) => handleChangePrice(event)} />

                            <button
                            type="submit"
                            className={styles.button}
                                // onClick={description && price ? refreshPage : null}
                            >
                                Enviar
                            </button>
                        </form>

                    </section>
                </div>

            </div>

        </>
    )
}