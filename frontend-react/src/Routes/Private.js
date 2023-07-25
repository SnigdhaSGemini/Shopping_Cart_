import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/Authorization";
import { Outlet } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../Components/LoadingPage";

export default function PrivateRoute () {
    const [ok,setOk] = useState(false);
    const [authorization,setAuthorization] = useAuth();

// set default value for axios

    useEffect(()=>{
        const userAuthorization = async () =>{
            const res = await axios.get('/api/auth/auth-user')
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(authorization?.token) userAuthorization();
    },[authorization?.token])
    return ok ? <Outlet/> : <LoadingPage/>
}