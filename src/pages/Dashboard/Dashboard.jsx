import { lazy, Suspense, useCallback, useEffect, useState, useTransition } from 'react'

import TransactionsList from '../../components/transactionsList/TransactionsList'

import styles from './Dashboard.module.css'
import Timer from './Timer.jsx'
const Reports = lazy( () => import('./Reports.jsx') )

const MOCK_DATA = Array.from({length: 100}, (_, i) => ({
    id: i,
    client: `Cliente ${i + 1}`,
    amount: parseInt(Math.random() * 1000),
    date: new Date().toLocaleString(),
    status: Math.random() > 0.5 ? "Concluído" : "Pendente"
}))


function Dashboard(){

    const [transactionsItens, setTransactionsItens] = useState(MOCK_DATA)
    const [tab, setTab] = useState("transactions")
    const [isPending, startTransition] = useTransition()
    const [pendingTab, setPendingTab] = useState(null)

    

    const handleDelete = useCallback(newId => {
        if(newId === undefined) return
        setTransactionsItens( prev => prev.filter( i => i.id !== newId))
    })

    const handleTabChange = (nextTab) => {
        setPendingTab(nextTab)
        startTransition( () => {
            setTab(nextTab)
        })
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Sistema Financeiro</h1>
                <div className={styles.timeCard}>
                  <Timer />
                </div>
            </header>

            <section>
                <nav className={styles.nav}>
                    <button className={`${styles.navButton} ${tab === "transactions" ? styles.activeButton : ''}`} onClick={() => handleTabChange("transactions")}> {isPending && pendingTab === "transactions" ? "Aguarde" : "Transações"} </button>
                    <button className={`${styles.navButton} ${tab === "reports" ? styles.activeButton : ''}`} onClick={() => handleTabChange("reports")}> {isPending && pendingTab === "reports" ? "Aguarde" : "Reports"} </button>
                </nav>
                <h2>Últimas transações</h2>

                {tab === "transactions" && <TransactionsList items={transactionsItens} onDelete={handleDelete}/>}

                {tab === "reports" && 
                <Suspense fallback={<p>Carregando lista</p>}>
                    <Reports />
                </Suspense>
                }
                

            </section>
            
        </div>
    )
}

export default Dashboard