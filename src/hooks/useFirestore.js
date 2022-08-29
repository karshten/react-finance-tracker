import { useReducer } from "react"
import { addDoc, collection, deleteDoc, Timestamp, doc } from 'firebase/firestore'
import { firestore } from "../firebase/config"

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { ...state, isPending: action.payload }
        case "ERROR":
            return { ...state, error: action.payload }
        case "ADDED_DOCUMENT":
            return { ...state, document: action.payload }
        case "DELETED_DOCUMENT":
            return {...state}
        default:
            return state
    }
}

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const collectionRef = collection(firestore, collectionName)

    const addDocument = async (document) => {
        dispatch({type: 'IS_PENDING', payload: true})
        try {
            const response = await addDoc(collectionRef, {...document, createdAt: Timestamp.fromDate(new Date())})

            dispatch({type: 'ADDED_DOCUMENT', payload: response})
        } catch (err) {
            dispatch({type: 'ERROR', payload: err.message})
        }
    }

    const deleteDocument = async (documentId) => {
        dispatch({type: 'IS_PENDING', payload: true})
        try {
            const docRef = doc(firestore, collectionName, documentId)
            await deleteDoc(docRef)

            dispatch({type: 'DELETED_DOCUMENT'})
        } catch (err) {
            dispatch({type: 'ERROR', payload: err.message})
        }
    }

    return {addDocument, response, deleteDocument}
}