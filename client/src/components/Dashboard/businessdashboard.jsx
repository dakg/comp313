import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import './Dashboard.css';
import NavBar from '../Navbar/DashboardNavbar.js';
import Search from '../Search/Search';
class BusinessDashboard extends Component {
 
  render() {
    const { user } = this.props.auth;
    return (
      <section>

   
      <section>
<NavBar/>
</section>
      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
              <h1>
                 <h1>Welcome to BusinessDashboard for QuoteMe</h1>
                 <br/>
                 User Name: <b>{user.name} </b>
                 <br/><br/>
                 Account Type: <b>{user.role}</b>
                 <br/> <br/>
                 User Email: <b> {user.email}</b>
                 <br/><br/>

                </h1>     
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>
    );
  }
}

BusinessDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(BusinessDashboard);
