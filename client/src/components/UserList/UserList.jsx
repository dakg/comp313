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
class UserList extends Component {
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

      

 /* deleteLaptop = (e) => {
    let productId = e.currentTarget.getAttribute('data-item');
    console.log(typeof(productId))
    axios.post('http://localhost:5000/api/laptops/deleteProduct', {"id":productId})
    .then((res) => {
        console.log('response',res);
    })
    .catch((error) => {
        console.log('error block called',error.message);
    })
    alert("id:"+productId + " has been delete");
    window.location.href = "ProductList";
  };*/

 /* updateLaptop= (e)=>{
    let pickedModel = e.currentTarget.getAttribute('data-item');
    let updateRequiredItem = this.state.laptopList.find(el => el.modelNumber === pickedModel);
    this.props.history.push({
      pathname: '/editLaptop',
        state: updateRequiredItem // your data array of objects
    })
  }*/

  /*routeChange = (e) =>{
   window.location.href = "addLaptop";}*/

    render (){
        userList= this.state.userList;
        console.log(userList)  

        return(
        <section>
          <section>
          <NavBar/>
          </section>

          <section>
         <h4 align="Center">User List</h4>
         </section>
         <Table striped>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>UserType</th>
                </tr>
              </thead>
         
        {userList && userList.map((data) => (
            
              
              <tbody>
                 <tr>
                 <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.usertype}</td>
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
export default  connect(mapStateToProps) (UserList);