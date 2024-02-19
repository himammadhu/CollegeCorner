import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from './User/App'
import Admin from './Admin/App'
import Guest from './Guest/App'

const App = () => {
  return (
   <Routes>
    <Route path='/User/*' element={<User/>}/>
    <Route path='/Admin/*' element={<Admin/>}/>
    <Route path='/Guest/*' element={<Guest/>}/>
    <Route path='/User/*' element={<User/>}/>
   </Routes>
  )
}

export default App
