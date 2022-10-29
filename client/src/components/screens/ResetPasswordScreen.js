
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ResetPasswordScreen.css";
import { set } from "mongoose";

import{toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return toast.error("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/users/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

     
      setSuccess(data.data);
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="bold-line"></div>
      <div className="container">
        <form onSubmit={resetPasswordHandler} className="window"> 
          <div className="overlay"></div>
          <div className="content">
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
            <div className="welcome">Reset Password</div>
            <div className="subtitle">
            Please enter a new password to continue
            </div>
            <div className="input-fields">
              <input
                type="password"
                placeholder="New Password"
                className="input-line full-width"
                required
                value= {password}
                onChange={(e)=> setPassword(e.target.value)}
              ></input>
                  <input
                type="password"
                placeholder="Confirm New Password"
                className="input-line full-width"
                required
                value= {confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
              ></input>
                
            </div>
            <div>
              <button  className="ghost-round full-width" >Reset Password</button>
              <Link to="/login"><button className="ghost-round signin">SIGN IN</button></Link>
              <Link to="/register"><button className="ghost-round signup">SIGN UP</button></Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
