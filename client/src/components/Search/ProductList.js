import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LaptopApiCalls from "../api/index";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import axios, { Axios } from 'axios';


let laptopList;
class ProductList extends Component {
    constructor(props) {
      super(props)    
      this.state = {
        laptopList: this.allLaptops()
      };

     
    }
      
    allLaptops = () => {
        LaptopApiCalls.getAllLaptops()
          .then((response) => {
            this.setState({laptopList : response.data});
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };

      

  deleteLaptop = (e) => {
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
  };

  updateLaptop= (e)=>{
    let pickedModel = e.currentTarget.getAttribute('data-item');
    let updateRequiredItem = this.state.laptopList.find(el => el.modelNumber === pickedModel);
    this.props.history.push({
      pathname: '/editLaptop',
        state: updateRequiredItem // your data array of objects
    })
  }

  routeChange = (e) =>{
   window.location.href = "addLaptop";}

    render (){
        laptopList= this.state.laptopList;
        console.log(laptopList)

        
        

        return(
        <section>
          <section>
          <Navbar/>
          </section>
          <section className="search py-4 container">
          <div className="row justify-content-center">
          <button style={{width:"20%"}}data-item class="btn btn-primary" onClick={this.routeChange}><b>ADD A PRODUCT</b></button>
         <h4>PRODUCT LIST MANAGER</h4>
        

        {laptopList &&
          laptopList.map((data) => (
            <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
              <div className="card p-0 overflow-hidden h-100 w-100 shadow">
                <img
                  src={data.imageUrl}
                  alt="laptop"
                  className="card-img-top h-100"
                />
                <div className="card-body">
                  <h5 className="card-title">{data.laptopName}</h5>
                  <p className="card-text">{data.brandName}</p>
                  <p className="card-text">Model Number: {data.modelNumber}</p>
                  <Button type="button" size="sm" class="btn btn-primary" data-item={data.modelNumber} onClick={this.updateLaptop}>Update </Button>
                  <Button type="button"  size="sm" variant="danger" data-item={data._id} onClick={this.deleteLaptop}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
      </div>
     
    </section>
      </section> 
    )

}
};
const mapStateToProps = (state) => ({
    auth: state.auth
  });
export default connect(mapStateToProps) (ProductList);