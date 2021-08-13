import React, { useState } from 'react';

import api from '../services/api'

import Loading from '../components/loading'
import logo from '../assets/money.svg'
import styles from '../styles/login.module.css'

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [shouldDisplayLoading, setShouldDisplayLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setShouldDisplayLoading(true);

        const response = await api.post('/sessions', { email })

        const { _id } = response?.data

        localStorage.setItem('user', _id)

        history.push('/dashboard')

    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <header id="header">
                        <img className={styles.logo} alt="dev.finances" src={logo} />
                        <h1>dev.finances</h1>
                    </header>
                    <section className={styles.content}>
                        <form onSubmit={handleSubmit} >
                            <label className={styles.label} >E-MAIL: *</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Seu melhor e-mail"
                                data-rules="required"
                                required={true}
                                autoFocus
                                className={styles.input}
                                value={email}
                                onChange={event => setEmail(event.target.value)} />

                            <button
                                type="submit"
                                className={styles.button}
                                disabled={shouldDisplayLoading}
                            >
                                {shouldDisplayLoading
                                    ? ( <Loading /> )
                                    : ( <span>Entrar</span> )}
                            </button>
                        </form>

                    </section>
                </div>

            </div>

        </>
    )
}