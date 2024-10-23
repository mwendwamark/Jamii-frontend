import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LandlordLogin.css";
import Navbar from "../../Components/Navbar/Navbar";
import img from "../../assets/landlordlogin.jpeg";


const LandlordLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null); // Clear the error after 8 seconds
      }, 8000);

      return () => clearTimeout(timeoutId); // Cleanup on component unmount or error change
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const landlordData = {
      landlord: {
        email,
        password,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/landlord/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(landlordData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.data.landlord)); // Save user data in localStorage
        localStorage.setItem("landlord_id", result.data.landlord.id); // Store the landlord id

        toast.success("Logged in successfully!");
        // Redirect to Landlord Dashboard
        navigate("/landlord/dashboard");
      } else {
        setError(result.status.message);
        toast.error("Error: Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="landlord-login-page container">
        <div className="landlord-login-container">
          <div className="landlord-login-image">
            <img src={img} alt="landlord-login-image" />
            <div className="landlord-login-overlay-text">
              <h1 className="h2-heading">Welcome back!</h1>
              <p>Join our platform to manage properties and more</p>
            </div>
          </div>

            <form onSubmit={handleSubmit} className="landlord-login-form">
              <div className="landlord-login-title">
                <h1 className="h2-heading">Login</h1>
              </div>
              <div className="landlord-login-email-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="landlord-login-password-input">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="password"
                  name="password"
                  placeholder="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="landlord-login-eye-icon"
                >
                  {" "}
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="landlord-forgot-password">
                <p>
                  <NavLink to="landlord/reset/password">Forgot Password?</NavLink>
                </p>
              </div>
              <div className="errors container ">
                {error && <p style={{ color: "red", padding: "0px 30px" }}>{error}</p>}
              </div>
              <button className="landlord-login-btn" type="submit">
                Login
              </button>

              <div className="landlord-dont-have-an-account">
                <p>
                  Don't have an account?{" "}
                  <span>
                    <NavLink to="/landlord/signup">Signup</NavLink>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      <ToastContainer />
    </>
  );
};

export default LandlordLogin;
