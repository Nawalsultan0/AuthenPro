import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Emailverification from './Pages/Emailverification'
import Resetpass from './Pages/Resetpass'
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div >
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}  />
         <Route path='/Login' element={<Login/>}  />
          <Route path='/Email verify' element={ <Emailverification/> }  />
           <Route path='/Reset-pass' element={ <Resetpass/> }  />
      </Routes>
    </div>
  )
}
