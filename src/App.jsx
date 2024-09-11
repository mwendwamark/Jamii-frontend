import React from "react";
import { Routes, Route } from "react-router-dom";
// Import files
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import RoleSelection from "./Pages/RoleSelection/RoleSelection";
import StudentSignup from "./Students/Signup/StudentSignup";
import StudentLogin from "./Students/Login/StudentLogin";
import LandlordLogin from "./Landlords/Login/LandlordLogin";
import LandlordSignup from "./Landlords/Signup/LandlordSignup";
import LandlordDashboard from "./Landlords/Dashboard/LandlordDashboard";
import HostelsPage from "./Students/HostelsPage/HostelsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/role-selection" element={<RoleSelection />}></Route>
        <Route path="/student-signup" element={<StudentSignup />}></Route>
        <Route path="/landlord-signup" element={<LandlordSignup />}></Route>
        <Route path="/student-login" element={<StudentLogin />}></Route>
        <Route path="/landlord-login" element={<LandlordLogin />}></Route>
        <Route path= "/landlord-dashboard" element= {<LandlordDashboard/>}></Route>       
        <Route path="/hostels" element={<HostelsPage/>}></Route>
      </Routes>

    </>
  );
}

export default App;
