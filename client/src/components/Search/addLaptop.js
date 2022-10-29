import React, { Component, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios, { Axios } from 'axios';
import Navbar from "../Navbar/Navbar";




 class AddLaptop extends Component {
  constructor(props) {
    super(props)

    this.onChangelaptopName = this.onChangelaptopName.bind(this);
    this.onChangebrandName = this.onChangebrandName.bind(this);
    this.onChangemodelNumber = this.onChangemodelNumber.bind(this);
    this.onChangeimageUrl = this.onChangeimageUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    // Setting up state
    this.state = {
      laptopName: '',
      brandName: '',
      modelNumber: '',
      imageUrl: ''
      
    }
 
  }

  onChangelaptopName(e){
    this.setState({ laptopName: e.target.value}); }

  onChangebrandName(e){
    this.setState({brandName: e.target.value});
  }

onChangemodelNumber(e){
  this.setState({modelNumber: e.target.value});
}

onChangeimageUrl(e){
  this.setState({ imageUrl: e.target.value});
}
    
  
  //add laptop
  onSubmit(e){
    e.preventDefault();
    console.log('Form Submitted:');
    console.log('LaptopName: ${this.state.laptopName}');
    console.log('BrandName: ${this.state.brandName}');
    console.log('ModelNumber: ${this.state.modelNumber}');
    console.log('ImageUrl: ${this.state.imageUrl}');

    const newLaptop = {
      laptopName: this.state.laptopName,
      brandName: this.state.brandName,
      modelNumber: this.state.modelNumber,
      imageUrl: this.state.imageUrl
    };
    
    axios.post('http://localhost:5000/api/laptops/addLaptop', newLaptop)
    .then(res => console.log(res.data));
    this.setState({
      laptopName: '',
      brandName:'',
      modelNumber:'',
      imageUrl:''
    })

    alert("Product Successfully Added!")
    this.props.history.push('/ProductList')

  }

render(){
  console.log(this.props.location.state)
  return (
    <section>
    <section>
    <Navbar/>
    </section>
  <div className="form-wrapper">
    <br></br><h5>Add Product Page</h5>    <br></br>
  <Form onSubmit={this.onSubmit}>
    <Form.Group controlId="Name">
      <Form.Label>Laptop Name:</Form.Label>
      <Form.Control type="text" value={this.state.laptopName} onChange={this.onChangelaptopName} />
    </Form.Group>
    <Form.Group controlId="Name">
      <Form.Label>Brand Name:</Form.Label>
      <Form.Control type="text" value={this.state.brandName} onChange={this.onChangebrandName} />
    </Form.Group>
    <Form.Group controlId="Name">
      <Form.Label>Model Number:</Form.Label>
      <Form.Control type="text" value={this.state.modelNumber} onChange={this.onChangemodelNumber} />
    </Form.Group>
    <Form.Group controlId="Name">
      <Form.Label>Image URL:</Form.Label>
      <Form.Control type="text" value={this.state.imageUrl} onChange={this.onChangeimageUrl} />
    </Form.Group>
    <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
      Add Product
    </Button>
  </Form>
</div>
</section>);

}
}

 
      
    
        
export default AddLaptop;