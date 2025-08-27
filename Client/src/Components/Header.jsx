import React, { useContext } from 'react'
import { assets } from '../assets/assets'
//import { data } from 'react-router-dom' 
import { AppContext } from '../Context/AppContext'

export default function Header() {

 const {userData}=useContext(AppContext)
  return (

    <div className=' flex flex-row '>
      <div>  <img src={assets.header_img} alt="" className=' w-36 h-36 rounded-full mt-5
       mb-6 '/></div>
    <div className=' flex flex-col items-center mx-20 px-4 text-gray-800'> 
    <h1 className='flex items-centre gap-2  text-xl sm:text-3xl font-medium mb-2'>

    hey  {userData ? userData.name :'Developer'}!
    
    <img src={assets.hand_wave} alt="" className='w-8 aspect-square' /> 
    </h1>
    <h2 className='text-3xl  sm:text-5xl font-semibold mb-4' >Welcome To Authify</h2>
    <p className='mb-8 max-w-md' >Let's start with a quick product tour and we will have you up and running in no time</p>
    <button className='border border-gray-500 rounded-full  px-8 py-2.6 
    hover:bg-gray-300 transition-all' >Get Startrd</button>
    </div>
    </div>
  )
}
