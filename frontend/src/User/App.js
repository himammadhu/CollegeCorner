
import {
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useState } from "react";
import ChatInterface from "./pages/ChatInterface/ChatInterface";



function App() {
const [check, setCheck] = useState(false)

    return (

      <div className={`theme-${check ? "dark" : "light"}`}>
        <Navbar  setCheck={setCheck} check={check}/>
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/profile" element={ <Profile />}/>
            </Routes>
          </div>
          <RightBar />
        </div>
      </div>
    );
  };



export default App;
