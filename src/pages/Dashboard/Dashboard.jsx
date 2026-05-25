import { useCallback, useEffect, useState } from 'react'

import TransactionsList from '../../components/transactionsList/TransactionsList'

import styles from './Dashboard.module.css'

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

    useEffect(() => {

        const time = setInterval(() => {
            setTimer(new Date().toLocaleTimeString())
        }, 1000)
        return () => { clearInterval(time)}
        
    })

    // function handleDelete(newId){
    //     setTransactionsItens( prev => prev.filter( i => i.id !== newId))
    // }

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
                <h2>Últimas transações</h2>

                <TransactionsList items={transactionsItens} onDelete={handleDelete}/>

            </section>
        </div>
    )
}

export default Dashboard