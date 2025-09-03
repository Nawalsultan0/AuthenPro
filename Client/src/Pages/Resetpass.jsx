import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState} from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Resetpass() {
   
  const { backendurl} = useContext(AppContext)
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  const [email, setemail] = useState('')
  const [newpass, setnewpass] = useState('')
  const [isEmailsent, setisEmailsent] = useState('')
  const [otp, setotp] = useState(0)
  const [isotpset, setisotpset] = useState(false)

  const inputRef = React.useRef([]);
  
             
    const handleinput =(e,index)=>{
    if(e.target.value.length  > 0 && index < inputRef.current.length - 1 ){
      inputRef.current[index + 1].focus()
    }
    }
    const handlekeydown= (e,index)=>{
       if(e.key ===  'Backspace' && e.target.value === ''&&  index > 0 ){
          inputRef.current[index - 1].focus()
      }
    }
  
      const handlepaste = (e)=>{
      const paste = e.clipboardData.getData('text')
  
      const pasteArray = paste.split('');
      pasteArray.forEach((char,index)=> {
        if(inputRef.current[index]){
          inputRef.current[index].value=char
        }
      })
    }   

   const onsubmitEmail = async (e)=> {
    e.preventDefault();
    try{
      const {data} = await axios.post('http://localhost:5000/api/auth/sendresetotp',{email})
      data.success? toast.success(data.message):toast.error(data.message)
      data.success && setisEmailsent(true)

    }catch(error){
      toast.error(error.message)
    }

   }
   const onsubmitotp = async (e)=> {
    e.preventDefault();
    try{
      const otpArray = inputRef.current.map(e=>e.value).join('')
      setotp(otpArray)
      setisotpset(true)
    }catch(error){
      toast.error(error.message)
    }

   }
  const onsubmitpassword = async (e)=> {
    e.preventDefault();
    try {
      
      const {data} = await axios.post('http://localhost:5000/api/auth/resetpass',{email,otp,newpass})
      data.success?toast.success(data.message):toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
 
    <div className='flex items-center justify-center min-h-screen  sm:px-0 
        bg-gradient-to-r  from-sky-300 to-indigo-300  ' >
           
       <img onClick={()=>navigate('/')}
            src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
    
  {!isEmailsent && 
    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
    text-indigo-300 text-sm '>
      <form onSubmit={onsubmitEmail} >
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
           <p className='text-center text-indigo-300 mb-6  '>Entre your registered Email id. </p>
             <div   className='mb-4 flex items-center py-2.5 px-5  w-full gap-3  rounded-full 
                    bg-[#333A5C] '>
                      <img src={assets.mail_icon} alt="" />
                    <input  onChange={e=>setemail(e.target.value)} value={email} 
                     type='email' placeholder='Email id' required  className='text-[#ffffff]
                    outline-none bg-transparent w-full'  />  
                    </div>
                <button className='w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900
                     text-amber-50 font-medium py-2.5' >Submit</button>
       
        </form>
    </div>
  }
    {/*otp foam*/}
    {!isotpset && isEmailsent && 
    <div>
      <form onSubmit={onsubmitotp} className='bg-slate-900 p-8 rounded  shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
           <p className='text-center text-indigo-300 mb-6  '>Entre the 6-digit code send to your Email id. </p>
           <div onPaste={handlepaste} 
           className=' flex mb-8 justify-between ' >
           {
            Array(6).fill(0).map((_,index)=>(
          <input type="text" maxLength='1' key={index}  required
          className=' w-12 h-12 bg-[#333A5C] text-amber-50 text-center text-xl rounded-md ' 
           ref={e=>inputRef.current[index]=e}
           onInput={(e)=>handleinput(e,index)}
           onKeyDown={(e)=>handlekeydown(e,index)}/>
            ))
           }
           </div>
           <button  className='w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900
        text-amber-50 font-medium py-2.5 '  >Sumbit</button>
        </form>
    </div>
}
    {/*enter new password*/}
    {isotpset && isEmailsent &&
    <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96
    text-indigo-300 text-sm '>
      <form onSubmit={onsubmitpassword}>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
           <p className='text-center text-indigo-300 mb-6  '>Entre the new password Below </p>
             <div   className='mb-4 flex items-center py-2.5 px-5  w-full gap-3  rounded-full 
                    bg-[#333A5C] '>
                      <img src={assets.lock_icon} alt="" />
                    <input  onChange={e=>setnewpass(e.target.value)} value={newpass} 
                     type='password' placeholder='Password' required  className='text-[#ffffff]
                    outline-none bg-transparent w-full'  />  
                    </div>
                <button className='w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900
                     text-amber-50 font-medium py-2.5' >Submit</button>
       
        </form>
    </div>
    
}
    </div>
  )
}
