import styles from './../../pages/Dashboard/Dashboard.module.css'



const TransictionItem = ({data}) => {
    return(
        <li className={styles.listItem}>  
            <div>
                <b>{data.client}</b>
                <p>{data.date}</p>
            </div>
            <div>
                <p className={styles.amount}>{data.amount}</p>
                <p className={styles.status}>{data.status}</p>
            </div>
        </li>
    )
}


const TransactionsList = memo(({items}) => {
    
    return (
        <ul className={styles.list}>
            {items.map( item => ( <TransictionItem key={item.id} data={item}/>))}
        </ul>
    )
})

export default TransactionsList


