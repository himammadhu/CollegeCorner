import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from './User/App'
import Admin from './Admin/App'
import College from './College/App'
import Guest from './Guest/App'
import ChatInterface from './User/pages/ChatInterface/ChatInterface'

const App = () => {
  return (
   <Routes>
    <Route path='/User/*' element={<User/>}/>
    <Route path='/Admin/*' element={<Admin/>}/>
    <Route path='/College/*' element={<College/>}/>
    <Route path='/*' element={<Guest/>}/>
    <Route path='/User/*' element={<User/>}/>

   </Routes>
  )
}

export default App
