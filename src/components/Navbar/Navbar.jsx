import React from "react";
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext'
import {useLogout} from '../../hooks/useLogout'

export const Navbar = () => {
    const { user } = useAuthContext()
    const {logout, error, isPending} = useLogout()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>Мои Финансы</li>
                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/sign-up">SignUp</Link>
                        </li>
                    </>
                )}
                {user &&
                    <>
                        <li>hello , {user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>Logout</button>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}