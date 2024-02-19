import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import List from './Pages/List/List'
import New from './Pages/New/New'
import Login from './Pages/Login/Login'
import Single from './Pages/Single/Single'
import { UserInputs, productInput } from './formSource'
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

{/* <Route path="/user/*">
              <Route index element={<List />} />
              <Route path=":userId" eleme nt={<Single />} />
              <Route path="New" element={<New inputs={UserInputs} title="Add New User" />} />
            </Route>
            <Route path="/product/*">
              <Route index element={<List />} />
              <Route path=":ProductId" element={<Single />} />
              <Route path="New" element={<New inputs={productInput} title="Add New product" />} />
            </Route>
            <Route path="/Login" element={<Login />} /> */}