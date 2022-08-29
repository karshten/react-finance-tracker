import React from 'react'
import { useCollection } from '../../hooks/useCollection'
import styles from './Home.module.css'
import TransactionForm from './TransactionForm'
import { TranactionsList } from './TransactionsList'


export const Home = () => {
    const {documents, error} = useCollection('transactions')
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <TranactionsList tranactions={documents}/>
            </div>
            <div className={styles.sidebar}>
                <TransactionForm />
            </div>
        </div>
    )
}