import React, { Component, useState, useEffect } from "react";
import NavBar from '../Navbar/Navbar.js';
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import axios from 'axios';
import SpecsApiCalls from "../api/index";
import QuoteApiCalls from "../api/index";



let pickedItem;
let specifications;
let pickedSpecs = [];
let lastQuotation;

class Customization extends Component {    

  constructor(props) {
    super(props);
    this.state = {
      specifications: this.allSpecs(),
      lastQuotation : this.lastQuote()
    };
  }

  allSpecs = () => {
    SpecsApiCalls.getAllSpecs()
      .then((response) => {
        this.setState({ specifications : response.data});
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  onClickHandler1 = (e) => {
    let detail = e.currentTarget.getAttribute('data-item');
    pickedSpecs = this.state.specifications.find(e1 => e1.specsName === detail);
    pickedItem.specifications.push(pickedSpecs)
    var div = document.getElementById('addedItemList');
    var p = document.createElement("p");
    p.innerHTML = pickedSpecs.specsName + "   $" + pickedSpecs.specsPrice;
    div.append(p);
    console.log(pickedItem);
  }

  calculateTotal=(items)=>{
    let totalPrice = 0;
    console.log(items)
    items.specifications.map((specs) => (
        totalPrice += parseFloat(specs.specsPrice)
      )
    )
    return totalPrice * 1.13;
  }

  generateQuotation =() =>{
    let totalPrice = this.calculateTotal(pickedItem);
    let nextQuoteNumber = Number(lastQuotation.quotationNum)+1;
    const user  = this.props.auth;
    const newQuoate = {
      quotationNum: nextQuoteNumber,
      laptopName: pickedItem.laptopName,
      brandName: pickedItem.brandName,
      modelNumber: pickedItem.modelNumber,
      createBy: user.name?user.name:"Guest",
      specification: pickedItem.specifications,
      totalPrice: totalPrice,
      createdAt: new Date()
    };
    
    axios.post('http://localhost:5000/api/quotations/customization', newQuoate)
    .then(res => console.log(res.data));
    alert("Quotation Successfully Created!")

    this.props.history.push({
      pathname: '/Summary',
        state: {item: pickedItem, quoteNum: nextQuoteNumber}// your data array of objects
    })

  }
  lastQuote = () => {
    QuoteApiCalls.getLastQuote()
      .then((response) => {
        this.setState({ lastQuotation : response.data});
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

    render() {    
      
      pickedItem = this.props.location.state;
      pickedSpecs = this.state.specifications;
      specifications= this.state.specifications;
      lastQuotation = this.state.lastQuotation;

      return (

      
        <section>
        <section>
        <NavBar/>
        </section>
       

        <section className="search py-4 container">
        <div className="row justify-content-center">
        <div className="col-12 mb-5">
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
        <h4>LAPTOP CUSTOMIZATION</h4>
              <div className="card p-0 overflow-hidden h-100 w-100 shadow">
                <img
                  src={pickedItem.imageUrl}
                  alt="laptop"
                  className="card-img-top h-100"
                />
                <div className="card-body">
                  <h5 className="card-title">{pickedItem.laptopName}</h5>
                  <p className="card-text">{pickedItem.brandName}</p>
                  <p className="card-text">Model Number: {pickedItem.modelNumber}</p>
             
              <b>SELECTED SPECIFICATIONS</b>
              <div id='addedItemList'></div>
              <button style={{width:"100%"}} class="btn btn-primary" onClick={this.generateQuotation}>Request for Quotation</button>
                </div>
              </div>
              
             
                
            
            
            
            
            
</div>
</div>
<h4>Choose your Laptop Specifications</h4><br></br>
  {specifications&&specifications.map((data) => (
            <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div className="card p-0 overflow-hidden h-100 w-100 shadow">

            <div className="card-body">
            <h5 className="card-title">{data.specsDescription}</h5>
            <p className="card-text">{data.specsName}</p>
            <p className="card-text">${data.specsPrice}</p>
            <button style={{width:"100%"}} data-item={data.specsName} class="btn btn-primary" onClick={this.onClickHandler1}>Add Item</button>
            
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
export default connect(mapStateToProps)(Customization);
