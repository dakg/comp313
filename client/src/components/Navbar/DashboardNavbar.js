import React, { Component } from 'react';
import { AdminMenuItems } from './AdminMenu';
import { Link } from 'react-router-dom';
import { Button } from "./Button/Button.js";
import './Navbar.css';
import { logoutUser } from '../../redux/actions/authActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class DashboardNavbar extends Component{
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
 
    render(){
     
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">QuoteMe!<i className="fas fa-tools">
                </i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                   
                    {AdminMenuItems.map((item, index) =>{
                        return(
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                            {item.title}
                            </a>
                        </li>)
                    })}
                    <li> <button
                  onClick={this.onLogoutClick}
                  className="btn btn-lg btn-warning"
                >
                  Logout
                </button></li>
                </ul>
               
                
                
               
            </nav>     
        )
    }
}
DashboardNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  
const mapStateToProps = state => ({
    auth: state.auth
  });
export default connect(mapStateToProps, { logoutUser })(DashboardNavbar);
