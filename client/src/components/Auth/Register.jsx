import React, { Component } from 'react';
import './Auth.css';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import classnames from 'classnames';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../Navbar/Navbar.js';
toast.configure();
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      usertype:'',
      phonenumber:'',
      password: '',
      password2: '',
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeRegister = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  registerSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      usertype: this.state.usertype,
      phonenumber: this.state.phonenumber,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
   toast.success("You have successfully registered with us!");
  };

  render() {
    const { errors, name, password, password2, email, usertype, phonenumber } = this.state;
    return (
      <section>

   
      <section>
<NavBar/>
</section>
      <section className="register">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="signup-left">
                <h4 className="text-capitalize">
                SignUp to have an account in QuoteMe!
                </h4>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="signup-right">
                <h1>Signup</h1>
                <form noValidate onSubmit={this.registerSubmit}>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="name">Full Name</label> <br />
                      <input
                        type="text"
                        
                        placeholder="Enter your name"
                        id="name"
                        value={name}
                        onChange={this.onChangeRegister}
                        error={errors.name}
                        className={classnames('', {
                          invalid: errors.name
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.name}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="Email">Email</label> <br />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={email}
                        onChange={this.onChangeRegister}
                        error={errors.email}
                        className={classnames('', {
                          invalid: errors.email
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.email}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="UserRole">User Type</label> <br />
                      <select type="usertype"  placeholder="Enter your User Type" id="usertype" value={usertype} onChange={this.onChangeRegister} error={errors.role} className={classnames('', { invalid: errors.usertype })}>
                        <option value=""> Select A User Type </option>
                        <option value="Individual Customer">Individual Customer</option>
                        <option value="Business / Organisation">Business / Organisation </option>
                      </select>
                      <br />
                      <span className="text-danger">{errors.usertype}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="PhoneNumber">Phone Number</label> <br />
                     <input
                        type="text"
                        placeholder="Enter your phone number"
                        id="phonenumber"
                        value={phonenumber}
                        onChange={this.onChangeRegister}
                        error={errors.phonenumber}
                        className={classnames('', {
                          invalid: errors.phonenumber
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.phonenumber}</span>
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
                        onChange={this.onChangeRegister}
                        error={errors.password}
                        className={classnames('', {
                          invalid: errors.password
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.password}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="Confirm Password">Confirm Password</label>
                      <br />
                      <input
                        type="password"
                       
                        placeholder="Confirm your password"
                        id="password2"
                        value={password2}
                        onChange={this.onChangeRegister}
                        error={errors.password2}
                        className={classnames('', {
                          invalid: errors.password2
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.password2}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <button type="submit" className="btn btn-md btn-primary" style={{width:"100%"}}>
                        Signup
                      </button>
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));