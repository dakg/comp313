import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LaptopApiCalls from "../api/index";
import UserApiCalls from "../api/user";
import NavBar from '../Navbar/DashboardNavbar.js';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios, { Axios } from 'axios';


let userList;
class InactiveUserList extends Component {
    constructor(props) {
      super(props)    
      this.state = {
        userList: this.allUsers()
      };

     
    }
      
    allUsers = () => {
        UserApiCalls.getAllUsers()
          .then((response) => {
            this.setState({userList : response.data});
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };


    render (){
        userList= this.state.userList;
        console.log(userList)  

        return(
        <section>
          <section>
          <NavBar/>
          </section>

          <section>
         <h4 align="Center">Inactive Users</h4>
         </section>
         <Table striped>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>UserType</th>
                  <th>Delete User</th>
                </tr>
              </thead>
         
        {userList && userList.map((data) => (
            
              
              <tbody>
                 <tr>
                 <td>{data.name}</td>
                <td>{data.usertype}</td>
                <td><Button className="primary">Delete</Button></td>
                </tr>
              </tbody>
   
            
          ))}
       </Table>
     
 
      </section> 
    )

}
};
const mapStateToProps = (state) => ({
    auth: state.auth
  });
export default  connect(mapStateToProps) (InactiveUserList);