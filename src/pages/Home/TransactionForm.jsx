import { useState } from "react"
import React from "react"
import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"

const TransactionForm = () => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { response, addDocument } = useFirestore('transactions')
    const {user} = useAuthContext()

    const hadnleSubmit = async (e) => {
        e.preventDefault()
        await addDocument({ name: name, amount: amount, authorId: user.uid})
        setName('')
        setAmount('')
    }
    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={hadnleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        required
                        type="string"
                        onChange={(e) => setAmount(+e.target.value)}
                        value={amount}
                    />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    )
}

export default TransactionForm