import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext()


export const AuthContextWrapper = ({ children }) => {
    const [auth, setAuth] = useState({
        isLogin: false,
        token: ""
    })
    useEffect(() => {
        //set in LocalStorage
        if (auth.isLogin) {
            localStorage.setItem("token", auth.token)
        } else {
            let isToken = localStorage.getItem("token") ? localStorage.getItem("token") : ""
            if (isToken) {
                setAuth({ isLogin: true, token: isToken })
            }
        }
    }, [auth])
    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(authContext)
}