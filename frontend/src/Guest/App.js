import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/login/Login'
import Register from './Pages/register/Register'


const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/Register' element={<Register/>}/>
   
   </Routes>
  )
}

export default App
