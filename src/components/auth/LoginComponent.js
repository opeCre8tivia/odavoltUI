import React, {useEffect, useState} from "react"
import {Link,Redirect} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import jwt_decode from "jwt-decode";
import {LoginUserAction} from '../../redux/actions'

import { Formik } from 'formik'
import * as Yup from 'yup'



// import SocialAuth from "../reusable/SocialAuth"
// import googlelogo from "../../assets/img/googlelogo.png"
// import fblogo from "../../assets/img/fblogo.png"
import OvLogo from "../reusable/ovLogo"
import Errors from "../reusable/Errors"



const validationSchema = Yup.object().shape({
    mobile:Yup.string().required().min(10).max(10),
    password:Yup.string().required()
})

const LoginComponent = (props) =>{
    //token
    const _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
    //component level state
    const [isTrueToken , setTrueToken] = useState(null)

    //redux state
    const dispatch = useDispatch()
    const {error,isAuthenticated,user} = useSelector((state)=>state.AuthReducer)
    const{showAuthComponentPopUp}= useSelector((state)=>state.AuthReducer)

    useEffect(()=>{
        if(_token !== null && isAuthenticated === true){
            console.log("run....")
            validateToken(_token)
        }
      
    },[isAuthenticated])

    function validateToken(tkn){
        console.log("validate...")
        const decoded = jwt_decode(tkn)
        console.log(decoded.user)
        console.log(user)
        if(decoded.user && isAuthenticated === true){
            setTrueToken(true)
            redirectUser()
           
        }
    }

    function onSubmit(formInfo){
       dispatch(LoginUserAction(formInfo))
       
    }

    function redirectUser(){
        console.log("redirect...")
        console.log(props)
        //redirect user to dash or home page
        if(window.location.pathname === '/login'){
            console.log(window.location.pathname)
           window.location.href='/user-dash'
           console.log (window.location.origin)
        }
        else if(window.location.pathname === '/'){
               
               console.log(showAuthComponentPopUp)
               
        }

    }




    return(
        <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11 login-container">
            {/* {isTrueToken === true ? redirectUser() : null} */}
             {/* logo space */}
             <div className="ov-auth-logo-cont">
                <OvLogo/>
            </div>
            {/* google sign up */}
            {/* <SocialAuth providerLogo={googlelogo} title="Login with Google" />
            <SocialAuth providerLogo={fblogo} title="Login with Facebook" /> */}

            {/* main error component */}
            
            {
            error && <div className="ov-error-cont">
                         <Errors error={error}/>
                    </div>
            }

            {/* form */}
            {/* implementin Formik */}
             <Formik
                initialValues={{mobile:"", password:""}}
                onSubmit={(values)=>onSubmit(values)}
                validationSchema = {validationSchema}
             >
                {({handleChange, handleSubmit,errors})=>(
                    <>
                        <form className="ov-auth-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <input type="text"
                                placeholder="Enter Mobile Number"
                                onChange= {handleChange("mobile")}
                                className= "form-control"
                                />
                            </div>
                            <div  style={{color:"red",fontSize:"80%"}}>{errors.mobile} </div>

                            <div className="form-group">
                                <input type="password"
                                placeholder="Enter password"
                                onChange= {handleChange("password")}
                                className= "form-control"
                                />
                            </div>
                            <div  style={{color:"red",fontSize:"80%"}}>{errors.password} </div>

                            <div className="form-group">
                                <input
                                 type="submit"
                                value="Login"
                                className= "btn btn-block ov-auth-btn"
                                />
                            </div>

                            <div className=" mt-2 ov-auth-alternative">
                                <p>Don't have an account yet <Link to="/signup"><span>Signup</span></Link></p>
                            </div>
                       </form>

                    </>
                )} 
                 
             </Formik>   

            
          

        </div>
    )
}

export default LoginComponent;