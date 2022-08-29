import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config.js'
import { useAuthContext } from './useAuthContext.js'


export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signUp = async (email, password, name) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(response.user, {
                displayName: name
            })
            dispatch({ type: 'SIGN_UP', payload: response.user })
            setError(null)
            setIsPending(false)
        } catch (err) {
            setError(err.message)
            setIsPending(false)
        }
    }

    return {signUp, error, isPending}
}