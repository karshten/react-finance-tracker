import { useRef, useState, useEffect } from "react";
import { Home, Login, SignUp } from "./pages";
import { Routes, Route } from 'react-router-dom'
import { Navbar } from "./components";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "./hooks/useAuthContext";
import { auth } from "./firebase/config"

function App() {
    const { dispatch } = useAuthContext()
    useEffect(() => {
        const cancel = onAuthStateChanged(auth, (_user) => {
            dispatch({ type: "LOGIN", payload: _user })
        })

        return () => cancel
    }, [])
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default App