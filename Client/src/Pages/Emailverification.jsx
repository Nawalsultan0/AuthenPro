import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { getUSERdata } from '../../../Server/controler/Usercontroller';




export default function Emailverification() {
  axios.defaults.withCredentials= true;

  const {userData, getUSERdata,  setuserData,setisLoggedin}= useContext(AppContext)
  const navigate = useNavigate()

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

  const submithandler = async(e) =>{
    try {
      e.preventDefault();
      const otpArray = inputRef.current.map(e=> e.value)
      const otp = otpArray.join('')

      const userId = localStorage.getItem("userId"); 
       console.log("Submitting OTP:", otp, "UserId:", userId); // 👈 Debug

      const {data} = await axios.post('http://localhost:5000/api/auth/verify-account',{otp,userId})
      if(data.success ){
        toast.success(data.message)
        getUSERdata()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen  sm:px-0 
    bg-gradient-to-r  from-sky-300 to-indigo-300    ' >
       
   <img onClick={()=>navigate('/')}
        src={assets.logo} alt="" className=' absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

        <form onSubmit={submithandler} className='bg-slate-900 p-8 rounded  shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email verification OTP</h1>
           <p className='text-center text-indigo-300 mb-6  '>Entre the 6-digit code send to your Email id. </p>
           <div onPaste={handlepaste} 
           className=' flex mb-8 justify-between ' >
           {
            Array(6).fill(0).map((_,index)=>(
          <input type="text" maxLength='1' key={index}  required
          className=' w-12 h-12 bg-[#333A5C] text-amber-50 text-center text-xl rounded-md ' 
           ref={e=>inputRef.current[index]=e}
           onInput={(e)=>handleinput(e,index)}
           onKeyDown={(e)=>handlekeydown(e,index)}



          />
            ))
           }
           </div>
           <button  className='w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900
        text-amber-50 font-medium py-2.5 '  >Verfify Email</button>
        </form>

    </div>
  )
}
