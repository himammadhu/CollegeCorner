import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'

import SideBar from './components/sidebar/SideBar'
import NavBar from './components/navbar/NavBar'
import AddCollage from './Pages/AddCollage/AddCollage'
import { Box } from '@mui/material'
import AddBatch from './Pages/AddBatch/AddBatch'
import AddHierarchy from './Pages/AddHierarchi/AddHierarchy'






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
              <Route path="/Batch" element={<AddBatch />} />
              <Route path="/Hierarchy" element={<AddHierarchy />} />

            </Routes>
          </Box>
        </div>
      </div>


    </div>
  )
}

export default App

