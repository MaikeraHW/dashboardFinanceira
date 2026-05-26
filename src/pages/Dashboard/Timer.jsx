import { useState, useEffect } from "react"

import styles from './Dashboard.module.css'

function Timer(){

    const [timer, setTimer] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
            const time = setInterval(() => {
                setTimer(new Date().toLocaleTimeString())
            }, 1000)
            return () => { clearInterval(time)}
            
        })

    return  <span className={styles.timerValue}>{timer}</span> 


}

export default Timer