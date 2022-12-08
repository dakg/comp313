import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import './Dashboard.css';
import NavBar from '../Navbar/DashboardNavbar.js';
import Search from '../Search/Search';
import { deleteUser } from '../../redux/actions/authActions';
import Button from 'react-bootstrap/Button';

class Dashboard extends Component {
  DeleteUser = (e) => {
      
      let userId = e.currentTarget.getAttribute('data-item');
      console.log(typeof(productId));
      console.log(userId);
      axios.post('http://localhost:5000/api/users/delete', {"id":userId})
      .then((res) => {
          console.log('response',res);
      })
      .catch((error) => {
          console.log('Error Response - ',error);
          console.log(error.response.data);  
          console.log(error.response.status);  
          console.log(error.response.headers); 
      })
      alert("id:"+userId + " has been deleted");
      this.props.logoutUser();
      window.location.href = "Login"
  }
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
                 <h1>Welcome to QuoteMe</h1>
                 <br/>
                 User Name: <b>{user.name} </b>
                 <br/><br/>
                 Account Type: <b>{user.role}</b>
                 <br/> <br/>
                 User Email: <b> {user.email}</b>
                 <br/><br/>

                </h1>   
                <Button type="button"  size="sm" variant="danger" data-item={user.id} onClick={this.DeleteUser}>
                Delete Account
                </Button>            
              </div>
            </div>


          </div>
        </div>
      </section>
      </section>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
