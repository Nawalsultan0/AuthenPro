import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
//import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext= createContext()

export const AppContextProvider = (props)=>{
    const backendurl =import.meta.env.VITE_BACKEND_URL
  
 const [isLoggedin, setisLoggedin] = useState(false)
 const [userData, setuserData] = useState(false)


  const getUSERdata = async ()=>{
    try {

        const {data} = await axios.get( 'http://localhost:5000/api/user/data')
        data.success? setuserData(data.userData):toast.error(data.message)

    } catch (error) {
        toast.error(error.message)
    }
 }

 const getAuthstate = async()=>{
    try {
        const {data} = await axios.get( "http://localhost:5000/api/auth/isAuth" ) 
        if(data.success){

            setisLoggedin(true)
            getUSERdata(data.user)
        }
    } catch (error) {
        toast.error(error.message)
    }
 }


 useEffect(()=>{
    
 getAuthstate()

 })
    const value={
      backendurl,
      isLoggedin,setisLoggedin,
      userData,setuserData,
      getUSERdata
    }
    return (
        <AppContext.Provider value={value} >
            {
               props.children
            }

        </AppContext.Provider>
    )
}