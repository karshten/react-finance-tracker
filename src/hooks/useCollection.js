import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"


export const useCollection = (collectionName) => {
    const [documents, setDoucments] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        if(!user) return
        const collectionRef = collection(firestore, collectionName)
        const que = query(collectionRef, where('authorId', '==', user.uid))

        const unSubscribe = onSnapshot(que, (snap) => {
            const res = snap.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .sort((a, b) => b.createdAt - a.createdAt)

            setDoucments(res)
        })

        return () => {
            unSubscribe()
        }
    }, [user])

    return { documents, error }
}