import React from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import styles from './Home.module.css'

export const TranactionsList = ({tranactions}) => {
    const {deleteDocument} = useFirestore('transactions')
    const handleDeleteDocument = async (document) => {
        await deleteDocument(document)
    }
    return (
        <ul className={styles.transactions}>
            {tranactions.map(transaction => (
                <li key={transaction.id}>
                    <p className={styles.name}>{transaction.name}</p>
                    <p className={styles.amount}>{transaction.amount}</p>
                    <button onClick={() => handleDeleteDocument(transaction.id)}>x</button>
                </li>
            ))}
        </ul>
    )
}