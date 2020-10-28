import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'



import {useDispatch,useSelector} from 'react-redux'
import {LoadUser} from './redux/actions'

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

//redux store

const App =(props)=> {

  //redux state
  // const dispatch = useDispatch()
  // const {isAuthenticated} = useSelector((state)=>state.AuthReducer)

  // useEffect(()=>{
  //   let  _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
  //   if(_token !== null){
  //     dispatch(LoadUser(_token))
  //   }
  // },[])

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
            </Router>
           
        </div>

  );
}

export default App;
