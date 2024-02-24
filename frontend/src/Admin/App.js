import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'

import SideBar from './components/sidebar/SideBar'
import NavBar from './components/navbar/NavBar'
import AddCollage from './Pages/AddCollage/AddCollage'
import { Box } from '@mui/material'
import AddBatch from './Pages/AddBatch/AddBatch'
import AddHierarchy from './Pages/AddHierarchi/AddHierarchy'
import Verification from './Pages/Verification/Verification'
import Accepted from './Pages/Accepted/Accepted'
import Rejected from './Pages/Rejected/Rejected'






const App = () => {
  return (
    <div className={"app"} >
      <div className='homeAdmin'>

        <SideBar />
        <div className="homeContainer">
          <NavBar />
          <Box sx={{p:3}}>


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/College" element={<AddCollage />} />
              <Route path="/Batch" element={<AddBatch />} />
              <Route path="/Hierarchy" element={<AddHierarchy />} />
              <Route path="/Verification" element={<Verification />} />
              <Route path="/Accepted" element={<Accepted />} />
              <Route path="/Rejected" element={<Rejected />} />

            </Routes>
          </Box>
        </div>
      </div>


    </div>
  )
}

export default App

