
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './ForgotPasswordScreen.css'

import{toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const ForgotPasswordScreen =({history}) => {
  const [email, setEmail] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
      if (localStorage.getItem("authToken")) {
          history.push('/')
      }
  
  }, [history])
  

  const forgotPasswordHandler = async (e) => {
    e.preventDefault()

    const config = {
      headers : {
        'Content-Type' :"application/json"
      }
    }
    try {
      const { data } = await axios.post(
        "/api/users/forgotpassword",
        {  email },
        config
      );

        toast.success(data.data)

    
    } catch (error) {
      toast.error(error.response.data.error);
      setEmail("")
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  return (
    <div>
      <div className="bold-line"></div>
      <div className="container">
        <form onSubmit={forgotPasswordHandler} className="window"> 
          <div className="overlay"></div>
          <div className="content">
            {error && {error}}
            {success &&{success}}
            <div className="welcome">Forgot Password</div>
            <div className="subtitle">
                Please enter your email address you register your account with. We will send you reset password confirmation to this email
            </div>
            <div className="input-fields">
              <input
                type="email"
                placeholder="Email"
                className="input-line full-width"
                required
                value= {email}
                onChange={(e)=> setEmail(e.target.value)}
              ></input>
        
             
            </div>
            <div>
              <button  className="ghost-round full-width" >Send</button>
            </div>
                
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
