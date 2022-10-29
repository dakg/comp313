import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LaptopApiCalls from "../api/index";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import{toast } from 'react-toastify'


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      laptopList: this.allLaptops()
    };
  }
  
  allLaptops = () => {
    LaptopApiCalls.searchLaptops()
      .then((response) => {
        this.setState({ laptopList : response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  onChangeSearchLaptop = (e) => {
    this.setState({search : e.target.value}, () => {
      console.log(this.state.search);
    })
  };

  findLaptopBySearch = () => {
    LaptopApiCalls.searchLaptops(this.state.search)
      .then((response) => {
        this.setState({ laptopList : response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
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

  onClickHandler = (e) => {
    let detail = e.currentTarget.getAttribute('data-item');
    let selectedData = this.state.laptopList.find(el => el.modelNumber === detail);
     
    this.props.history.push({
      pathname: '/customization',
        state: selectedData // your data array of objects
    })
  }

   //history = useHistory();
   routeChange = (e) =>{
   window.location.href = "ProductList";
   //this.props.history.push({
   // pathname: 'ProductList'})
  }

  routeChange1 = (e) =>{
    window.location.href = "./specsList";

  }
  sendemail = (e) =>{
    axios.post("api/sendemail/sendquotation");
    toast.success("Email Sent");
  }

  render (){
    const {search, laptopList } = this.state;
    console.log(laptopList)
    
    return(
    <section>
      <section>
      <Navbar/>
      </section>
      
      <button type="button" class="btn btn-primary" onClick={this.routeChange} > Manage Laptop List</button>
      <button type="button" class="btn btn-primary" onClick={this.routeChange1} > Manage Specifications</button>
      <button type="button" class="btn btn-primary" onClick={this.sendemail} >Quotation Email</button>
      <section className="search py-4 container">

      <div className="row justify-content-center">
        <div className="col-12 mb-5">
          <div className="mb-3 col-4 mx-auto text-center">
            <h1 className="form-label h4"> Search Laptops</h1>
            <div class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={this.onChangeSearchLaptop}
              ></input>

              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.findLaptopBySearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

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
                  <button style={{width:"100%"}}data-item={data.modelNumber} class="btn btn-primary" onClick={this.onClickHandler}>
                    Customize
                  </button>
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
export default Search;