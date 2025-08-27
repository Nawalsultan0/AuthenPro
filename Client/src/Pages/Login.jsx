import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Login() {

  const [State, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();   
  const { backendurl, setisLoggedin, getUSERdata} = useContext(AppContext)

  const  SubmitHandler = async(e)=>{
   
   e.preventDefault();
    try {
     axios.defaults.withCredentials=true

    
    if(State === 'Sign Up'){
    const {data} = await axios.post("http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password
      }) 
        if(data.success){
           setisLoggedin(true)
           getUSERdata()
           navigate('/')
        }else{
       toast.error(data.message)
        }

    }else{
    const {data} = await axios.post( "http://localhost:5000/api/auth/login",
      {
        email,
        password
      }) 
        if(data.success){
           setisLoggedin(true)
           getUSERdata()
           navigate('/')
        }else{
       toast.error(data.message)
        } 
    }
   } catch (error) {
    toast.error(error.message)
   }
   
  } 


  return (
  
    <div className='flex items-center justify-center min-h-screen px-6 py-2.5 sm:px-0 
    bg-gradient-to-r  from-sky-300 to-indigo-300    ' > 

    <img onClick={()=>navigate('/')}
     src={assets.logo} alt="" className=' absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
    text-indigo-300 text-sm '>

      <h2 className=' text-3xl  font-semibold text-amber-50  text-center mb-3 '>{State === 'Sign Up' ? 'Create Account ' :'Login Account'   }</h2>
      <p className='text-center text-sm mb-6' >{State === 'Sign Up' ? 'Create Your Account ' :'Login To Your Account!'}</p>

      <form
      onSubmit={SubmitHandler}>
        {State === 'Sign Up' && (
        <div   className='mb-4 flex items-center py-2.5 px-5  w-full gap-3  rounded-full 
        bg-[#333A5C] '>
          <img src={assets.person_icon} alt="" />
        <input  onChange={e=>setName(e.target.value)} value={name}
        type="text" placeholder='Full Name' required  className='text-[#ffffff]
        outline-none bg-transparent '  />
        </div>
        )}
        
         <div   className='mb-4 flex items-center py-2.5 px-5  w-full gap-3  rounded-full 
        bg-[#333A5C] '>
          <img src={assets.mail_icon} alt="" />
        <input  onChange={e=>setEmail(e.target.value)} value={email} 
         type='email' placeholder='Email id' required  className='text-[#ffffff]
        outline-none bg-transparent w-full'  />
        </div>

         <div   className='mb-4 flex items-center py-2.5 px-5  w-full gap-3  rounded-full 
        bg-[#333A5C] '>
          <img src={assets.lock_icon} alt="" />
        <input  onChange={e=>setPassword(e.target.value)} value={password}
         type='password' placeholder='Password' required  className='text-[#ffffff]
        outline-none bg-transparent '  />
        </div>
        <p onClick={()=>navigate('/Reset-pass')}
        className='mb-4 text-indigo-500 cursor-pointer '>Forget password?</p>
        <button className='w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900
        text-amber-50 font-medium py-2.5' >{State}</button>
      </form>
      {
        State === 'Sign Up'?
      (   
      <p className='text-gray-400 text-center text-sm mt-4'>Already have an Account?{' '}
        <span onClick={()=>setState('Login') } className='text-blue-400 cursor-pointer underline'>
          Login here</span>
      </p>) :
     (
      <p className='text-gray-400 text-center text-sm mt-4'>Don't have an Account?{' '}
        <span onClick={()=>setState('Sign Up') }  className='text-blue-400 cursor-pointer underline'>
          Sign up</span>
      </p> )
}
    </div>
    </div>
  )
}



  
  

  