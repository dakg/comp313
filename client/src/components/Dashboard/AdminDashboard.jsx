import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import './Dashboard.css';
import NavBar from '../Navbar/DashboardNavbar.js';
import Search from '../Search/Search';
class AdminDashboard extends Component {
 
  render() {
    const { user } = this.props.auth;
    return (
      <section>

   
      <section>
<NavBar/>
</section>
      <section className="admindashboard">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <h1>
                  Hi! <b>{user.name.split(' ')[0]} </b>
                 <b>{user.role}</b> 
                 <b> {user.email}</b>
                </h1>
                <h3>
                  You are Successfully logged in the Dummy Admin Dashboard!
                </h3>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
    );
  }
}

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminDashboard);
