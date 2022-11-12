import React, { Component, useState, useEffect } from "react";
import NavBar from '../Navbar/Navbar.js';
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import axios from 'axios';
import QuotationApiCalls from "../api/index";
// import Button from 'react-bootstrap/Button';
let quotationHistory;
class History extends Component {    

    constructor(props) {
      super(props);
      this.state = {
        quotationHistory: this.allQuotationHistory(),
      };
    }
  
    allQuotationHistory = () => {
      QuotationApiCalls.getAllQuotationHistory().then((response) => {
          this.setState({ quotationHistory : response.data});
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          
        });
    };

    // deleteSpecs = (e) => {
    //   let specId = e.currentTarget.getAttribute('data-item');
    //   console.log(typeof(specId))
    //   axios.post('http://localhost:5000/api/specs/deleteSpecs', {"id":specId})
    //   .then((res) => {
    //       console.log('response',res);
    //   })
    //   .catch((error) => {
    //       console.log('error block called',error.message);
    //   })
    //   alert("id:"+specId + " has been deleted");
    //   window.location.href = "History";
    // };

    // updateSpecs=(e) => {
    //   let pickedSpec = e.currentTarget.getAttribute('data-item');
    //   let updateRequiredItem = this.state.quotationHistory.find(el => el.specsName === pickedSpec);
    //   this.props.history.push({
    //     pathname: '/editSpecs',
    //     state: updateRequiredItem
    //   })
    // }

    // routeChange = (e) =>{
    //     window.location.href = "addSpecs";}


    render (){
        quotationHistory= this.state.quotationHistory;
        console.log(quotationHistory)

        
        return(
          
        <section>
          <section>
          <NavBar/>
          </section>
          <section className="search py-4 container">
          <div className="row justify-content-center">
            <div className="d-grid gap-2 col-3 mx-auto">
          {/* <button data-item class="btn btn-primary" onClick={this.routeChange}><b>ADD A SPECIFICATION</b></button> */}
          </div>
         <h4>All Quotations</h4>
        

         {quotationHistory&&quotationHistory.map((data) => (
            <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div className="card p-0 overflow-hidden h-100 w-100 shadow">

            <div className="card-body">
            <h5 className="card-title">Quotation Id: {data.quotationNum}</h5>
            <p className="card-text">Laptop Name: {data.laptopName}</p>
            <p className="card-text">Quotation Date: {data.createdAt}</p>
            <p className="card-text">Quotation User: {data.createBy}</p>
            <p className="card-text">Amount: ${data.totalPrice}</p>
            {/* <Button type="button" size="sm" class="btn btn-primary" data-item={data.specsName} onClick={this.updateSpecs} >Update </Button>
            <Button type="button"  size="sm" variant="danger" data-item={data._id} onClick={this.deleteSpecs} >Delete</Button> */}
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

export default connect(mapStateToProps) (History);