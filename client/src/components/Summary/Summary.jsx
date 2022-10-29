import React, { Component } from "react";
import NavBar from '../Navbar/Navbar.js';
import { connect } from 'react-redux';
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas"

let productDetail=[]
let total;
class Summary extends Component {

    calculateTotal=(specItems)=>{
        let totalPrice = 0;
        specItems.map((specs) => (
            totalPrice += parseFloat(specs.specsPrice)
          )
        )
        return totalPrice;
    }

     printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
              console.log(input)
            const pdf = new jsPDF("L", "mm", "a4");
            const imgData = canvas.toDataURL('image/png');
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 10, 10, width*0.9, height*0.9);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }

      
    render() {
        console.log(this.props.location.state)
        productDetail = this.props.location.state.item;
        total = this.calculateTotal(productDetail.specifications);
        const { user } = this.props.auth;
        const componentRef=''
        
        
        
      return (
        <section>
  
     
        <section>
        <NavBar/>
        </section>
            <div class="container header">
                <div class="row">
                <div class="headline" >
                    <h1>{user.name?user.name:"Guest"}, Thank you for using QuoteMe system.</h1> 
                    <h2>Summary of your request for {productDetail.laptopName} {productDetail.specifications.length > 0? "with your custom specification": ""} are below</h2> 
                </div>
                </div>
            </div>
            <br/>
            <br/>
            <div class="container contents" id='divToPrint'>
                <div class="col box1"> 
                <div className="row">
                <div className="col-12 mb-5" >
                    <h3>Quotation</h3>
                    <br/>
                    <h3>Quotation Number: {this.props.location.state.quoteNum}</h3>
                <table class="table">
                    <thead>
                    <tr class="table-secondary">
                        <th scope='col'>Description</th>
                        <th scope='col'>Price</th> 
                    </tr>
                    </thead>
                    <tbody>
                    <tr scope="row">
                        <td>{productDetail.laptopName} {productDetail.brandName} {productDetail.modelNumber}</td>
                    </tr>
                    {productDetail.specifications.map((specs) => (
                        <tr><td>{specs.specsName}</td><td>${specs.specsPrice}</td></tr>
                      )
                     )
                    }
                    <tr style={{height:"10vh"}}/>
                    <tr scope="row">
                        <td style={{fontWeight:'bold', fontSize:'20px'}}>Tax</td>
                        <td>${(total*0.13).toFixed(2)}</td>
                    </tr>
                    <tr scope="row">
                        <td style={{fontWeight:'bold', fontSize:'20px'}}>Total</td>
                        <td>${(total*1.13).toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        <div class="container bottomContent">
                <div class="row">
                    <div class="bottomContent">
                        <button className="btn btn-danger btn-lg" onClick={this.printDocument} >Download as PDF</button>
                    </div>
                </div>
            </div>
    </section>
  )
  }
  }
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(Summary);