import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";
import StudentNavbar from "../StudentNavbar/StudentNavbar";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/student/login");
  };

  if (!user) {
    navigate("/student/login");
    return null;
  }

  return (
    <>
      <StudentNavbar />
      <div className="student-profile-page container">
        <h1>Student Profile</h1>
        <p>
          <strong>First Name:</strong> {user.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {user.phone_number}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default StudentProfile;
