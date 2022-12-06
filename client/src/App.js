import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import { Provider } from 'react-redux';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/Dashboard/dashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import BusinessDashboard from './components/Dashboard/businessdashboard';
import Customization from './components/Customization/customization';
import ProductList from './components/Search/ProductList';
import Search from './components/Search/Search';
import AddLaptop from './components/Search/addLaptop';
import EditLaptop from './components/Search/editLaptop';
import Summary from './components/Summary/Summary'
import SpecsList from './components/Customization/specsList';
import AddSpecs from './components/Customization/addSpecs';
import EditSpecs from './components/Customization/editSpecs';
import UserList from './components/UserList/UserList';
import InactiveUserList from './components/InactiveUserList/InactiveUserList';
import QuotationHistory from './components/History/History';




function App() {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded)); // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser()); // Redirect to login
      window.location.href = "./login";
    }
  }
  return (
    <Provider store={store}>
     
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
       
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} /> 
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/admindashboard" component={AdminDashboard} />
            <PrivateRoute exact path="/businessdashboard" component={BusinessDashboard} />
            <Route path="/search" component={Search}/>
          <Route path="/customization" component={Customization}/>
          <Route path="/ProductList" component={ProductList}/>
          <Route path="/addLaptop" component={AddLaptop}/>
          <Route path="/editLaptop" component={EditLaptop}/>
          <Route path="/Summary" component={Summary}/>
          <Route path="/specsList" component={SpecsList}/>
          <Route path="/addSpecs" component={AddSpecs}/>
          <Route path="/editSpecs" component={EditSpecs}/>
          <Route path="/UserList" component={UserList}/>
          <Route path="/InactiveUserList" component={InactiveUserList}/>
          <Route path="/quotation-history" component={QuotationHistory}/>
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
        </Switch>
        
      </Router>
    </Provider>
  );
}

export default App;
