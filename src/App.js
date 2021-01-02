import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/fa/css/all.css"
import './App.css';
// import LoginComponent from './components/auth/LoginComponent';
// import SignUpComponent from "./components/auth/SignUpComponent"
import UserDash from "./components/auth/UserDash"
import Home from './components/home/Home';
import ViewMore from './components/reusable/ViewMore';
import SupermarketHomePage from './components/reusable/SupermarketHomePage';
import AuthComponent from "./components/auth/AuthComponent"
import Cart from "./components/cart/Cart"
import BottomTabNavigator from './components/home/BottomTabNavigator';
import Internet from './components/reusable/Internet'
import codeSignup from './components/auth/CodeSignup'
import CodeLogin from './components/auth/CodeLogin'


//redux store

const App =(props)=> {


 

  return (
    
        <div className="ov-master-container" >

          
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={CodeLogin}/>
                    <Route path="/signup" exact component={codeSignup}/>
                    <Route path="/user-dash" exact component={UserDash} />
                    <Route path="/view/category/:id" exact component={ViewMore} />
                    <Route path="/view/supermarket/:id" exact component={SupermarketHomePage} />
                </Switch>
          
            <Cart/>
            <AuthComponent/>
            {/* separator */}
            <div style={{width:"100%",height:"60px"}} ></div>  
            
            {/* bottom tab nav container */}
            <div style={{display:"block",position:"fixed",bottom:0}} >
            <BottomTabNavigator/>
            </div>

            <Internet />
           
          </Router>
        </div>

  );
}

export default App;
