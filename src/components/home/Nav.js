import React from 'react'
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {loginButtonClicked} from '../../redux/actions'



const Nav = ()=> {
    
//component state
// check path visited so as to hide header
let pathVisited = window.location.pathname;
//redux state
    let dispatch = useDispatch();
    let {isAuthenticated,} = useSelector(state => state.AuthReducer);

//hundle login button cliked
    const onLoginBtnClicked=()=>{
        dispatch(loginButtonClicked())
    }
//onlog out function
    const onLogout = () =>{
        dispatch({type:'LOG-OUT'});
        
    }



        return (
            <div className="nav-container" >
                <div className="logo-container" >
                   <Link to="/">  <img src={require("../../assets/img/ov-letter-logo.svg")} alt="odavolt logo" />  </Link>
                </div>

                {isAuthenticated === true ?
                  <div className="userprofile-icon-container">
                        <img src={require("../../assets/img/user-icon.png")} alt="user icon" />
                  </div>

                :  <div className="ov-auth-btn-cont">

                    { pathVisited ==='/signup' ? <Link to="/login"><button className="ov-login-btn">LOGIN</button></Link>:
                        <div>
                        <Link to="/signup"><button className="ov-signup-btn">SIGN UP</button></Link> 
                        <button className="ov-login-btn" onClick={onLoginBtnClicked}>LOGIN</button>
                        </div>
                   }
               
                 </div>}
                
            </div>
        )
    }




export default Nav
