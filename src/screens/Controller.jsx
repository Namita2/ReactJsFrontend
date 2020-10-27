import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Checkout from './checkout/Checkout';
import Details from './details/Details';
import Home from './home/Home';
import ProtectedRoute from './ProtectedRoute';
import Profile from "../screens/profile/Profile";


class Controller extends Component{
    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
        this.accessToken =sessionStorage.getItem('access-token');     
      }
       state = {
    loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
  };
    render(){
        return(
                <Router>
                    <div>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/details/:id' render={({history}, props) => <Details {...props} history={history}/>} />
                     {/* <Route exact path='/checkout' render={({history}, props) => <Checkout {...props} baseUrl={this.baseUrl} accessToken={this.accessToken} history={history}/>} /> */}
                    {/* <Route exact path="/checkout" render={(props)=> <Checkout {...props} baseUrl={this.baseUrl} headers={this.headers}/>}></Route> */}
                    <ProtectedRoute path="/checkout" loggedIn={this.state.loggedIn} baseUrl={this.baseUrl} accessToken={this.accessToken}  component={Checkout } />
                    <Route exact path="/profile" render={props=> <Profile {...props} baseUrl={this.baseUrl}/>}/>
                    </div>
                </Router>
        )
    }
}
export default Controller;