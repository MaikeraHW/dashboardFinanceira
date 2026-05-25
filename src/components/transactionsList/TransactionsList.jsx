import { memo } from 'react'

import styles from './../../pages/Dashboard/Dashboard.module.css'



const TransictionItem = ({data, onDelete}) => {
    return(
        <li className={styles.listItem}>  
            <div>
                <b>{data.client}</b>
                <p>{data.date}</p>
            </div>
            <div>
                <p className={styles.amount}>{data.amount}</p>
                <p className={styles.status}>{data.status}</p>
                <button className={styles.deleteBtn} onClick={ () => onDelete(data.id)}>Deletar</button>
            </div>
        </li>
    )
}


const TransactionsList = memo(({items, onDelete}) => {
    
    return (
        <ul className={styles.list}>
            {items.map( item => ( <TransictionItem key={item.id} data={item} onDelete={onDelete}/>))}
        </ul>
    )
})

export default TransactionsList


