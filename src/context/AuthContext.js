import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signout(){
        return auth.signOut()
    }
    
    function anonSignIn(){
        return auth.signInAnonymously()
    }

    const value={
        currentUser,
        signup,
        login,
        signout,
        anonSignIn
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

  return (
    <AuthContext.Provider value={value}>
        { !loading && children }
    </AuthContext.Provider>
  )
}