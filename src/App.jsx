import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import files
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import RoleSelection from "./Pages/RoleSelection/RoleSelection";
import StudentSignup from "./Students/Signup/StudentSignup";
import StudentLogin from "./Students/Login/StudentLogin";
import LandlordLogin from "./Landlords/Login/LandlordLogin";
import LandlordSignup from "./Landlords/Signup/LandlordSignup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/role-selection" element={<RoleSelection/>}></Route>
          <Route path="/student-signup" element={<StudentSignup/>}></Route>
          <Route path= "/student-login" element={<StudentLogin/>}></Route>
          <Route path= "/landlord-signup" element={<LandlordSignup/>}></Route>
          <Route path= "/landlord-login" element={<LandlordLogin/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
