import React, {useEffect, useState} from "react"
import jwt_decode from "jwt-decode";
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import {RegisterUserAction,LoadUser} from '../../redux/actions'

import {Formik }from 'formik'
import * as Yup from 'yup'
import {Helmet} from "react-helmet";

// import SocialAuth from "../reusable/SocialAuth"
// import googlelogo from "../../assets/img/googlelogo.png"
// import fblogo from "../../assets/img/fblogo.png"
import OvLogo from "../reusable/ovLogo"
import Errors from "../reusable/Errors"


//yup validation schema

const validationSchema = Yup.object().shape({
    name:Yup.string().required().min(3).max(25),
    email:Yup.string().required().email(),
    password:Yup.string().required().min(6),
    mobile:Yup.string().required().min(10).max(12)
})

const SignUpComponent = () =>{

//component level state
const [err , setErr] = useState(null)

//redux state
const dispatch = useDispatch()
const {registered,error,token} = useSelector((state)=>state.AuthReducer)


/*
* Handle token, dispatch User object to LoadUser action
*/      
    useEffect(()=>{
        if(token !== null){
            handleAuthorisation(token)
        }
    },[token])

    function handleAuthorisation(token){
        //decode
        console.log(token)
        let decoded = jwt_decode(token);
        console.log(decoded)
        localStorage.setItem("ov_TKN_aUTh", JSON.stringify(token))
        dispatch(LoadUser(token))

    }

    const onSubmit= async(formData)=>{
        dispatch(RegisterUserAction(formData))
        
    }
   
    return(
            <>
                {/* SEO */}
                <Helmet>
                    <title>SIGN UP | odavolt</title>
                    <meta
                        name="description"
                        content="Register now and shop online in Soroti and beyond | odavolt number one online grocery store in  Soroti,Kumi,Serere,Amuria,Mbale,Moroto,Lira,Gulu Uganda
                                 |e-commerce platform in Eastern Uganda |rising tech giant in Uganda Africa
                        "
                    />
                    <meta/>
                </Helmet>


               <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11 signup-container">

                   {registered === true ? <Redirect to="/"></Redirect> : null}

               {/* logo space */}
               <div className="ov-auth-logo-cont">
                   <OvLogo/>
               </div>
               
               {/* google sign up */}
               {/* <SocialAuth providerLogo={googlelogo} title="Sign Up with Google" />
               <SocialAuth providerLogo={fblogo} title="Sign Up with Facebook" />
                */}


               {/* main error component */}
                
                {
                error &&  <div className="ov-error-cont"> 
                             <Errors error={error} />
                         </div>
                }


               <Formik
                        initialValues={{name:'', email:'',password:'',mobile:''}}
                        onSubmit={(values)=>onSubmit(values)}
                        validationSchema={validationSchema}
                > 
                    {({handleChange,handleSubmit, errors})=>(
                        <>
                            <form onSubmit={handleSubmit} className="ov-auth-form">

                            <div className="form-group">
                                <input type="text"
                                    placeholder="Enter name"
                                    // name = "name"
                                    onChange= {handleChange('name')}
                                className= "form-control"
                                    />
                            </div>
                            <div style={{color:"red",fontSize:"80%"}}> {errors.name}  </div>

                            <div className="form-group">
                                <input type="email"
                                    placeholder="Enter email"
                                    // name = "email"
                                    onChange= {handleChange('email')}
                                    className= "form-control"
                                    />
                            </div>
                            <div style={{color:"red",fontSize:"80%"}}> {errors.email}  </div>

                            <div className="form-group">
                                <input type="mobile"
                                    placeholder="Enter mobile number"
                                    // name = "mobile"
                                    onChange= {handleChange("mobile")}
                                    className= "form-control"
                                    />
                            </div>
                            <div style={{color:"red",fontSize:"80%"}}> {errors.mobile}  </div>

                            <div className="form-group">
                                <input type="password"
                                    placeholder="Enter password"
                                    // name = "password"
                                    onChange= {handleChange("password")}
                                    className= "form-control"
                                    />
                            </div>
                            <div style={{color:"red",fontSize:"80%"}}> {errors.password}  </div>

                            <div className="form-group">
                                <input type="submit"
                                    value="Signup"
                                    className= "btn btn-block ov-auth-btn"
                                    />
                            </div>

                            <div className=" mt-2 ov-auth-alternative">
                                <p>Already have an account <Link to="/login"><span>Login</span></Link></p>
                            </div>
                        </form>
                      </>      

                    )}

                </Formik>
               
                
           </div>
         </> 
    )
}

export default SignUpComponent;