

import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import CSS for styling
import { AppContext } from "../Context/AppContext";

const AuthForm = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userData,setUserData,token,setToken} = useContext(AppContext);
  

  useEffect(() => {
    // Reset error messages when switching between login/signup
  }, [isLoginActive]);

  const handleLoginClick = () => setIsLoginActive(true);
  const handleSignupClick = () => setIsLoginActive(false);


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token"); // Or wherever the token is stored

        const response = await axios.post(
            "http://localhost:5000/api/register",
            {
                userName: name,
                email,
                password,
            },
            {
                headers: {
                    authorization: token ? `Bearer ${token}` : "", // Add Authorization header
                },
            }
        );

        console.log(response.data);
        toast.success("Account created successfully Please Login with your credentials!"); // ✅ Toast on success
        
    } catch (error) {
        console.error(error);
        toast.error("Signup failed. Try again!"); // ✅ Toast on failure
    }
};


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
  
      console.log(response.data);
      setUserData(response.data);
      // console.log(response.data.user.token);
      localStorage.setItem("token", JSON.stringify(response.data.user.token));
      
      toast.success("Login SuccessFful")
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Check credentials!");
    }
  };

  return (
    <form>
      <div className="parent">
        <div className="form-structor">
          {/* Signup Section */}
          <div className={`signup ${isLoginActive ? "slide-up" : ""}`}>
            <h2 className="form-title" id="signup" onClick={handleSignupClick}>
              <span>or</span>Sign up
            </h2>
            <div className="form-holder">
              <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="submit-btn" onClick={handleSignup}>Sign up</button>
          </div>

          {/* Login Section */}
          <div className={`login ${isLoginActive ? "" : "slide-up"}`}>
            <div className="center">
              <h2 className="form-title" id="login" onClick={handleLoginClick}>
                <span>or</span>Log in
              </h2>
              <div className="form-holder">
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button className="submit-btn" onClick={handleLogin}>Log in</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </form>
  );
};

export default AuthForm;