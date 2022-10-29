import React, { Component, useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios, { Axios } from 'axios';
import Navbar from "../Navbar/Navbar";


class AddSpecs extends Component {
    constructor(props) {
      super(props)
  
      this.onChangespecsDescription = this.onChangespecsDescription.bind(this);
      this.onChangespecsName = this.onChangespecsName.bind(this);
      this.onChangespecsPrice = this.onChangespecsPrice.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
  
      // Setting up state
      this.state = {
        specsDescription: '',
        specsName: '',
        specsPrice: ''
      
        
      }
   
    }
  
    onChangespecsDescription(e){
      this.setState({ specsDescription: e.target.value}); }
  
    onChangespecsName(e){
      this.setState({specsName: e.target.value});
    }
  
    onChangespecsPrice(e){
    this.setState({specsPrice: e.target.value});
    }
  
 
    
    //add specs
    onSubmit(e){
      e.preventDefault();
   
      const newSpecs = {
        specsDescription: this.state.specsDescription,
        specsName: this.state.specsName,
        specsPrice: this.state.specsPrice,
        
      };
      
      axios.post('http://localhost:5000/api/specs/addSpecs', newSpecs)
      .then(res => console.log(res.data));
      this.setState({
        specsDescription: '',
        specsName:'',
        specsPrice:''
      
      })
  
      alert("Specification Successfully Added!")
      this.props.history.push('/specsList')
  
    }
  
  render(){
    console.log(this.props.location.state)
    return (
      <section>
      <section>
      <Navbar/>
      </section>
    <div className="form-wrapper">
      <br></br><h5>Add Specification Page</h5>    <br></br>
    <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Name">
        <Form.Label>Description:</Form.Label>
        <Form.Control type="text" value={this.state.specsDescription} onChange={this.onChangespecsDescription} />
      </Form.Group>
      <Form.Group controlId="Name">
        <Form.Label>Specs Name:</Form.Label>
        <Form.Control type="text" value={this.state.specsName} onChange={this.onChangespecsName} />
      </Form.Group>
      <Form.Group controlId="Name">
        <Form.Label>Specs Price:</Form.Label>
        <Form.Control type="text" value={this.state.specsPrice} onChange={this.onChangespecsPrice} />
      </Form.Group>
     
      <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
        Add Specification
      </Button>
    </Form>
  </div>
  </section>);
  
  }
  }
  
   
        
      
          
  export default AddSpecs;