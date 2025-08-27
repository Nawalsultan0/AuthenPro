import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'

export default function Home() {
  return (
    <div className=' flex flex-col  items-center justify-center min-h-screen 
    bg-cover bg-center bg-gradient-to-r from-sky-300 to-indigo-300 '>
      <Navbar/>
      <Header/>
    </div>
  )
}
