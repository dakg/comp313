import React, { Component } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";
import axios from "axios";
import NavBar from '../Navbar/Navbar.js';

class Login extends Component {
 
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    
    };
  }
  
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
    
      // const { user } = this.props.auth;
     
      // if(user.role = "Admin"){
      //   this.props.history.push("/admindashboard");
      // }
      
      //  else if (user.role = "Individual Customer")
      //  {
      //   this.props.history.push("/dashboard");
      
      //  }
      this.props.history.push("/dashboard");
    }
    
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated )
    {
      const { user } = this.props.auth;
     
      if(user.role == 'Admin'){
        this.props.history.push("/admindashboard");
      }
      
       else if (user.role == 'Individual Customer')
       {
        this.props.history.push("/dashboard");
      
       }

    } 

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangeLogin = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  loginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { email, password, errors } = this.state;
    const { user } = this.props.auth;
    return (
      <section>

   
      <section>
<NavBar/>
</section>
      <section className="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="login-left">
                <h4>Please Enter your login credentials to enter the Quotation System!</h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-right">
                <h1>Login</h1>
                <form noValidate onSubmit={this.loginSubmit}>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="Email">Email</label> <br />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={email}
                        onChange={this.onChangeLogin}
                        error={errors.email}
                        className={classnames("", {
                          invalid: errors.email || errors.emailNotFound,
                        })}
                      />{" "}
                      <br />
                      <span className="text-danger">
                        {errors.email}
                        {errors.emailNotFound}
                      </span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="Password">Password</label> <br />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        value={password}
                        onChange={this.onChangeLogin}
                        error={errors.password}
                        className={classnames("", {
                          invalid: errors.password || errors.passwordIncorrect,
                        })}
                      />{" "}
                      <br />
                      <span className="text-danger">
                        {errors.password}
                        {errors.passwordIncorrect}
                      </span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <button type="submit" className="btn btn-md btn-primary" style={{width:"100%"}}>
                        Login
                      </button>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <p>
                        Forgot your password?
                        <Link to="/forgotpassword" className="text-success">
                          Reset it
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
