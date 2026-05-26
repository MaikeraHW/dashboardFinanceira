import { lazy, useCallback, useEffect, useState } from 'react'

import TransactionsList from '../../components/transactionsList/TransactionsList'

import styles from './Dashboard.module.css'
const Reports = lazy( () => import('./Reports.jsx') )

const MOCK_DATA = Array.from({length: 100}, (_, i) => ({
    id: i,
    client: `Cliente ${i + 1}`,
    amount: parseInt(Math.random() * 1000),
    date: new Date().toLocaleString(),
    status: Math.random() > 0.5 ? "Concluído" : "Pendente"
}))


function Dashboard(){

    const [timer, setTimer] = useState(new Date().toLocaleTimeString())
    const [transactionsItens, setTransactionsItens] = useState(MOCK_DATA)
    const [tab, setTab] = useState("transactions")

    useEffect(() => {

        const time = setInterval(() => {
            setTimer(new Date().toLocaleTimeString())
        }, 1000)
        return () => { clearInterval(time)}
        
    })

    const handleDelete = useCallback(newId => {
        if(newId === undefined) return
        setTransactionsItens( prev => prev.filter( i => i.id !== newId))
    })

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Sistema Financeiro</h1>
                <div className={styles.timeCard}>
                   <span className={styles.timerValue}>{timer}</span> 
                </div>
            </header>

            <section>
                <nav className={styles.nav}>
                    <button className={`${styles.navButton} ${tab === "transactions" ? styles.activeButton : ''}`} onClick={() => setTab("transactions")}> Transactions </button>
                    <button className={`${styles.navButton} ${tab === "reports" ? styles.activeButton : ''}`} onClick={() => setTab("reports")}> Reports </button>
                </nav>
                <h2>Últimas transações</h2>

                {tab === "transactions" && <TransactionsList items={transactionsItens} onDelete={handleDelete}/>}

                {tab === "reports" && <Reports />}
                

            </section>
            
        </div>
    )
}

export default Dashboard