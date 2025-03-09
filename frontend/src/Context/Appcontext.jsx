import { createContext ,useDebugValue,useEffect,useState} from "react";
import axios from 'axios'

import { toast } from 'react-toastify';



export const AppContent= createContext()

export const AppContextProvider = (props)=>{
const backendUrl=import.meta.env.VITE_BACKEND_URL
const [isLoggedin,setIsLoggedin]=useState(false)
const [userData,setuserData]=useState(false)
axios.defaults.withCredentials = true;

const getAuthState=async ()=>{
    try{
        const {data}=await axios.get(backendUrl+'/api/is-auth',{email,password})
  if(data.sucsess){
    setIsLoggedin(true)
    getUserData()
  }
    }catch(err){

        toast.error(data.message)

    }
}


const getUserData=async ()=>{
    try{
      const {data}=await axios.get(backendUrl+'/api/data',{email,password})
data.success ? setuserData(data.userData):toast.error(data.message)
    }catch(err){
        toast.error(err.message)
    }
}

useEffect(()=>{
    getAuthState();
},[])
    const value ={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setuserData
    }
    return(
        <AppContent.Provider value={value}>

            {props.children}
        </AppContent.Provider>
    )
}