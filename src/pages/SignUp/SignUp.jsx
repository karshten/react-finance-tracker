import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignUp } from '../../hooks/useSignUp'
import styles from './SignUp.module.css'

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const {signUp, error, isPending} = useSignUp()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signUp(email, password, displayName)
        navigate('/')
    }
    const handleSubmitWithGoogle = (e) => {
        e.preventDefault()
        console.log(email, password, displayName)
    }

    return (
        <form className={styles["signup-form"]}>
            <h2>SignUp</h2>
            {error && <p>{error}</p>}
            <label>
                <span>email: </span>
                <input onChange={(e) => setEmail(e.target.value)} type="email" required/>
            </label>
            <label>
                <span>password: </span>
                <input onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            <label>
                <span>display name: </span>
                <input onChange={(e) => setDisplayName(e.target.value)} type="text" required/>
            </label>
            <button onClick={handleSubmit} className="btn">SignUp</button>
            <button onClick={handleSubmitWithGoogle} className="btn google">SignUp with google</button>
        </form>
    )
}