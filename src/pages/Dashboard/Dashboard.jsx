import { lazy, Suspense, useCallback, useEffect, useState, useTransition } from 'react'

import Timer from './Timer.jsx'
import TransactionForm from './TransactionForm.jsx'
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

    const [transactionsItens, setTransactionsItens] = useState(MOCK_DATA)
    const [tab, setTab] = useState("transactions")
    const [isPending, startTransition] = useTransition()
    const [pendingTab, setPendingTab] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const filtredTransactions = transactionsItens.filter( t => t.client.toLowerCase().includes(searchTerm.toLowerCase()))

    

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

    const handleAddTransaction = (newData) => {
        setTransactionsItens( prev => [newData, ...prev])
        console.log(TransactionsList)
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

                {tab === "transactions" && (
                    <>
                    <input type="text" value={searchTerm} placeholder='Buscar cliente' onChange={ (e) => setSearchTerm(e.target.value)} />
                    <TransactionForm onAddTransaction={handleAddTransaction}/>
                    <TransactionsList items={filtredTransactions} onDelete={handleDelete}/>
                    </>
                    )}

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