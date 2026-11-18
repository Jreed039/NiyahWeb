import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import AddPost from "./Components/AddPost";
import SignUp from "./Pages/SignUp";
// import ChatRoom from "./Components/ChatRoom";
// Dev Server → index.js → App.js → HelloWorld.js → JSX → Virtual DOM → Browser
//npm run dev 
//BrowserRouter OR Router to navigate between diff. pages in the application providing SPA.

function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Settings" element={<Settings/>}/>
        <Route path="/Explore" element={<Explore/>}/>
        <Route path="/AddPost" element={<AddPost/>}/>
        {/* <Route path="/ChatRoom" element={<ChatRoom/>}/> */}
      </Routes>
    </div>
   </Router>
  )
}

export default App;

