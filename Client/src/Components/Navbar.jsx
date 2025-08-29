import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


export default function Navbar() {
  const navigate = useNavigate()
  const {userData, setuserData,setisLoggedin  } = useContext(AppContext)

  const sendverifyotp= async ()=>{
  try {
    axios.defaults.withCredentials =true;

  const { data } = await axios.post('http://localhost:5000/api/auth/sendverifyotp')
  if(data.success){
    navigate('/Email verify')
    toast.success(data.message)
  }else{
     toast.error(data.message) 
    }
  } catch (error) {
    toast.error(error.message)
  }
  }
  const logout =async () => {
    try {
      axios.defaults.withCredentials= true;
      const {data} = await axios.post('http://localhost:5000/api/auth/logout')
      data.success && setisLoggedin(false)
      data.succes && setuserData(false)
      navigate('/')
    } catch (error) {
     toast.error(error.message) 
    }
  }

  return (
    <div  className='w-full  flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0' >
        <img src={assets.logo}  alt=" "  className='w-28 sm:w-32 ' />
        { userData?
          <div className='w-8 h-8 flex  justify-center items-center
           text-amber-50 bg-gray-800 rounded-full   relative group '>
            {userData.name[0].toUpperCase()}
            <div className=' absolute hidden  group-hover:block top-0 right-0
             text-black rounded pt-10  z-10'>
              <ul className=' list-none m-0 p-2  text-sm  
              bg-gray-200  '>
                {
                !userData.isverified && <li onClick={sendverifyotp} className=' py-1 px-2 hover:bg-gray-400  cursor-pointer '>
                  Verify Email  
                   </li>   }
                <li onClick={logout} className=' py-1 px-2 hover:bg-gray-400 pr-15 cursor-pointer '>
                  Logut</li>
              </ul>
            </div>
          </div> 
          : <button onClick={()=>navigate('/Login')}
         className='flex items-center border gap-1.5 border-gray-500 rounded-full  
        px-8 py-2.8 hover:bg-gray-300 transition-all '>Login
          <img src={assets.arrow_icon} alt="" /> 
          </button>
        }

      
    </div>   
  )
}
