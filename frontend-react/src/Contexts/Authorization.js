import { useState,useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [authorization, setAuthorization] = useState({
        user: null,
        token: ""
    })

    
axios.defaults.headers.common['Authorization'] = authorization?.token
    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuthorization({
                ...authorization,
                user: parseData.user,
                token: parseData.createToken
            })
        }
        // eslint-disable-next-line
    },[])
    return <AuthContext.Provider value={[authorization,setAuthorization]}>
        {children}
    </AuthContext.Provider>
}

// custom hooks
const useAuth =() =>useContext(AuthContext)

export {useAuth, AuthProvider}