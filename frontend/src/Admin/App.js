import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'

import SideBar from './components/sidebar/SideBar'
import NavBar from './components/navbar/NavBar'
import AddCollage from './Pages/AddCollage/AddCollage'
import { Box } from '@mui/material'






const App = () => {
  return (
    <div className={"app"} >
      <div className='homeAdmin'>

        <SideBar />
        <div className="homeContainer">
          <NavBar />
          <Box>


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/College" element={<AddCollage />} />

            </Routes>
          </Box>
        </div>
      </div>


    </div>
  )
}

export default App

