import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'



import {useDispatch,useSelector} from 'react-redux'
import {LoadUser,ShowCart} from './redux/actions'



import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/fa/css/all.css"
import './App.css';
import LoginComponent from './components/auth/LoginComponent';
import SignUpComponent from "./components/auth/SignUpComponent"
import UserDash from "./components/auth/UserDash"
import Home from './components/home/Home';
import DashBoard from './components/auth/dash/DashBoard';
import ViewMore from './components/reusable/ViewMore';
import SupermarketHomePage from './components/reusable/SupermarketHomePage';
import AuthComponent from "./components/auth/AuthComponent"
import Cart from "./components/cart/Cart"
import BottomTabNavigator from './components/home/BottomTabNavigator';

//redux store

const App =(props)=> {

  //redux state
  const dispatch = useDispatch()

  return (
    
        <div className="ov-master-container" >
          
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={LoginComponent}/>
                    <Route path="/signup" exact component={SignUpComponent}/>
                    <Route path="/user-dash" exact component={UserDash} />
                    <Route path="/admin-dash" exact component={DashBoard} />
                    <Route path="/view/category" exact component={ViewMore} />
                    <Route path="/view/supermarket" exact component={SupermarketHomePage} />
                </Switch>
          
            <Cart/>
            <AuthComponent/>
            {/* separator */}
            <div style={{width:"100%",height:"60px"}} ></div>  
            
            {/* bottom tab nav container */}
            <div style={{display:"block",position:"fixed",bottom:0}} >
            <BottomTabNavigator/>
            </div>
           
          </Router>
        </div>

  );
}

export default App;
