import React, {useState} from 'react'
import { useLogin } from '../../hooks/useLogin'
import {useNavigate} from 'react-router-dom'    
import styles from './Login.module.css'

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isPending} = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        navigate('/')
    }

    const handleSubmitWithGoogle = (e) => {
        e.preventDefault()
        console.log(email, password, 'valid')
    }

    return (
        <form className={styles["login-form"]}>
            <h2>login</h2>
            {error && <p>{error}</p>}
            <label>
                <span>email: </span>
                <input onChange={(e) => setEmail(e.target.value)} type="email" required/>
            </label>
            <label>
                <span>password: </span>
                <input onChange={(e) => setPassword(e.target.value)} type="password" required/>
            </label>
            <button onClick={handleSubmit} className="btn">Login</button>
            <button onClick={handleSubmitWithGoogle} className="btn google">Login with google</button>
        </form>
    )
}