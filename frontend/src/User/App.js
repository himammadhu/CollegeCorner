
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
import { useLocation } from 'react-router-dom';



function App() {
  const [check, setCheck] = useState(false)
  const [userdata, setUserData] = useState(null)
  const { pathname } = useLocation(); // Use the useLocation hook and destructure pathname

  const isChatComponentPage = pathname ==='/user/Chat/ChatComponent/';
  const isChatComponentUrl = pathname === '/user/Chat/';

  return (

    <div className={`theme-${check ? "dark" : "light"}`}>
      <Navbar setCheck={setCheck} check={check} setUserData={setUserData} />
      <div style={{ display: "flex" }}>
        {!isChatComponentPage && !isChatComponentUrl && <LeftBar />}
        <div style={{ flex: 6 }}>
          <Routes>
            <Route path="/" element={<Home userdata={userdata} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Chat/*" element={< ChatInterface />} />

          </Routes>
        </div>
        {!isChatComponentPage && !isChatComponentUrl && <RightBar />}
      </div>
    </div>
  );
};



export default App;
