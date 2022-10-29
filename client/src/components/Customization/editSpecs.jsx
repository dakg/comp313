import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios, { Axios } from 'axios';
import Navbar from "../Navbar/Navbar";

class EditSpecs extends Component {
    constructor(props) {
      super(props)
  
      this.onChangespecsDescription = this.onChangespecsDescription.bind(this);
      this.onChangespecsName = this.onChangespecsName.bind(this);
      this.onChangespecsPrice = this.onChangespecsPrice.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      let updateRequired = this.props.location.state;
      console.log(updateRequired)
   
      this.state = {
        id: updateRequired._id,
        specsDescription: updateRequired.specsDescription,
        specsName: updateRequired.specsName,
        specsPrice: updateRequired.specsPrice    
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

    onSubmit(e){
      e.preventDefault();
      console.log('Form Submitted:');
      console.log('specsDescription: ${this.state.specsDescription}');
      console.log('specsName: ${this.state.specsName}');
      console.log('specsPrice: ${this.state.specsPrice}');
  
      const updatedSpec = {
        id: this.state.id,
        specsDescription: this.state.specsDescription,
        specsName: this.state.specsName,
        specsPrice: this.state.specsPrice
      };
      
      axios.post('http://localhost:5000/api/specs/editSpec', updatedSpec)
      .then(res => console.log(res.data));
      this.setState({
        id:'',
        specsDescription: '',
        specsName:'',
        specsPrice:''
      })
  
      alert("Specification Successfully Edit!")
      this.props.history.push('/specsList')
  
    }
  
  render(){
    return (
      <section>
      <section>
      <Navbar/>
      </section>
    <div className="form-wrapper">
      <br></br><h5>Edit Specification Page</h5>    <br></br>
    <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Name">
        <Form.Label>Specification Description:</Form.Label>
        <Form.Control type="text" value={this.state.specsDescription} onChange={this.onChangespecsDescription} />
      </Form.Group>
      <Form.Group controlId="Name">
        <Form.Label>Specification Name:</Form.Label>
        <Form.Control type="text" value={this.state.specsName} onChange={this.onChangespecsName} />
      </Form.Group>
      <Form.Group controlId="Name">
        <Form.Label>Specification Price:</Form.Label>
        <Form.Control type="text" value={this.state.specsPrice} onChange={this.onChangespecsPrice} />
      </Form.Group>
      <Button variant="primary" size="lg" block="block" type="submit" className="mt-4">
        Edit Specification
      </Button>
    </Form>
  </div>
  </section>);
  
  }
  }
  
   
        
      
          
  export default EditSpecs;