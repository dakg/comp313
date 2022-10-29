import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import NavBar from '../Navbar/Navbar.js';

class Home extends Component {
  render() {
    return (
      <section>

   
      <section>
<NavBar/>
      </section>
      <section id="banner" className="banner">
        
        <div className="container p-0">
          <div className="row">
            <div className="col-lg-9">
              <div className="banner-left">
                <h1 className="text-capitalize">
                 Welcome to QuoteMe!
                </h1>
                <div className="buttons">
                <Link
                    to="/register"
                    className="btn btn-lg btn-outline-none border-3 btn-register"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-lg btn-outline-none border-3 btn-login"
                  >
                    Login
                  </Link>
                
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      </section>
    );
  }
}

export default Home;
