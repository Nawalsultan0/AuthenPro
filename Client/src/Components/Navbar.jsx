import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'


export default function Navbar() {
  const navigate = useNavigate()
  const {userData, setuserData, backendurl,setisLoggedin  } = useContext(AppContext)

  return (
    <div  className='w-full  flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0' >
        <img src={assets.logo}  alt=" "  className='w-28 sm:w-32 ' />
        { userData?
          <div className='text-sm font-medium text-amber-50 bg-gray-800 rounded-fulls'>
            {userData.name[0]?.toUpperCase()}
          </div> : 
           <button onClick={()=>navigate('/Login')}
         className='flex items-center border gap-1.5 border-gray-500 rounded-full  
        px-8 py-2.8 hover:bg-gray-300 transition-all '>Login
          <img src={assets.arrow_icon} alt="" /> 
          </button>
        }

      
    </div>   
  )
}
