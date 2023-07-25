import React, {useState,useEffect} from 'react'
import { useNavigate , useLocation} from 'react-router-dom'

// Loading Page - Appears when it takes time to load any page while switching between pages
const LoadingPage = ({path = "login"}) => {
    const [wait,setWait] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const time = setInterval(()=>{
            setWait((previous)=>--previous)
        },1000);
        wait === 0 && navigate(`/${path}`
        ,{
            state:location.pathname
        }
        );
        return () => clearInterval(time)
    },[wait,navigate
        ,location,path
    ])
  return (
    <>
     <div className='loading-page'>
     <h1 className='text-center text-light'>Loading Data In {wait} seconds</h1>
    <div className="spinner-grow text-danger" role="status"></div>
     <div className="spinner-grow text-warning" role="status"></div>
     <div className="spinner-grow text-success" role="status"></div>
     </div>

    </>
  )
}

export default LoadingPage
