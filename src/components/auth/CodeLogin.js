import React, {useEffect, useState} from "react"
// import jwt_decode from "jwt-decode";
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import {ValidateLoginEmail,LoadUser,ValidateLoginOTP} from '../../redux/actions'

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
    email:Yup.string().required().email(),
   })

const CodeLogin = () =>{

//component level state
const [code,setCode]= useState(null)
const [disableButton ,setDisableButton] = useState(true)
const [showError,setShowError] = useState(false)


//redux state
const dispatch = useDispatch()
const { isAuthenticated,error,loading,isValidated} = useSelector((state)=>state.AuthReducer)

let token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
/*
* Handle token, dispatch User object to LoadUser action
*/      
    useEffect(()=>{
        if(token !== null){
            handleAuthorisation(token)
        }
    },[token])


       //use effect to show and dismiss error message
       useEffect(()=>{
        if(error){
            setShowError(true)
           
            setTimeout(()=>{
            //set it back to false after 3 s
            setShowError(false)
            dispatch({type:'CLEAR_ERROR'})

            },3000)
        }

    },[error])

   

    function handleAuthorisation(token){
        localStorage.setItem("ov_TKN_aUTh", JSON.stringify(token))
        dispatch(LoadUser(token))

    }

    const onSubmit= (formData)=>{
        
        dispatch(ValidateLoginEmail(formData))
        
    }

    function handleCodeEntry(e){
        let currentInput = e.target

        if(currentInput.value.length > 0 ){
            //keep the border color as primary
            currentInput.style.borderBottom = "1px solid var(--ov-primary)"
            //cocatinate the values to form one string
            if(code === null){
                let _value = e.target.value
                setCode(_value)
            }
            else{
                let _newValue = code.toString()+e.target.value
                setCode(_newValue)
            }

            //enable submit button
            if(code !== null && code.length > 2){
                setDisableButton(false)
            }

            //skip focus to next  sibling
            if(currentInput.nextElementSibling !== null){
                currentInput.nextElementSibling.focus()
            }
            else if(currentInput.nextElementSibling === null){
                    currentInput.blur()
            }

            //TODO: take care of left and right arrow for moving to previous or next siblings
            
        }
    }


   function validateCode(){
            let otp = code
            dispatch(ValidateLoginOTP(otp))

            setCode(null)
    }



    return(
        <>
        {/* SEO */}
        <Helmet>
            <title>LOGIN | odavolt</title>
            <meta
                name="description"
                content="Login an experience a convinent way of  online shopping in Soroti,Kumi,Serere,Amuria,Mbale,Moroto,Lira,Gulu Uganda
                        odavolt, Uganda e-commerce platform serving Soroti city and beyond
                "
            />
            <meta/>
        </Helmet>

        <div className="col-lg-5 col-md-5 col-sm-11 col-xs-11 signup-container">

                   { isAuthenticated === true ? <Redirect to="/user-dash"></Redirect> : null}

               {/* logo space */}
               <div className="ov-auth-logo-cont">
                   <OvLogo/>
               </div>

               <div className="ov-auth-page-title-text" >
                LOGIN
               </div>
               
               {/* google sign up */}
               {/* <SocialAuth providerLogo={googlelogo} title="Sign Up with Google" />
               <SocialAuth providerLogo={fblogo} title="Sign Up with Facebook" />
                */}


               {/* main error component */}
                <div style={{width:'100%',minHeight:'28px'}}>
                {
                showError === true ?  <div className="ov-error-cont"> 
                             <Errors error={error} />
                         </div>: null
                }
                </div>


               { isValidated===false ? <Formik
                        initialValues={{ email:''}}
                        onSubmit={(values)=>onSubmit(values)}
                        validationSchema={validationSchema}
                > 
                    {({handleChange,handleSubmit, errors})=>(
                        <>
                            <form onSubmit={handleSubmit} className="ov-auth-form">

                            
                            <div className="form-group">
                                <input type="email"
                                    placeholder="Enter email"
                                    // name = "email"
                                    onChange= {handleChange('email')}
                                    className= "form-control"
                                    />
                            </div>
                            <div style={{color:"red",fontSize:"80%",minHeight:'16px'}}> {errors.email}  </div>

                           
                            {loading === false ?<div className="form-group">
                                <input type="submit"
                                    value="Login"
                                    className= "btn btn-block ov-auth-btn"
                                    />
                            </div> :
                            <div className="form-group">
                                <button type="submit" className= "btn btn-block ov-auth-btn">
                                <div className="spinner-border"></div>
                                </button>
                            </div>
                            
                            }

                            <div className=" mt-2 ov-auth-alternative">
                            <p>Don't have an account yet <Link to="/signup"><span>Signup</span></Link></p>
                            </div>
                        </form>
                      </>      

                    )}

                </Formik> : isValidated === true ? <>
                 <div className="row row-reset" >
                  <div className="instruction-text-cont">
                      <div className="instruction-text-big">*NO MORE PASSWORDS*</div>
                      <div className="instruction-text-small"> A short code has been sent to your Email, Enter it below to continue (expires in 10 mins)</div>
                  </div>   
                 <div className="code-input-cont">
                        
                            <input type="text"  className="code-input " onChange={handleCodeEntry} />
                            <input type="text"  className="code-input"  onChange={handleCodeEntry}/>
                            <input type="text"  className="code-input"  onChange={handleCodeEntry}/>
                            <input type="text"  className="code-input"  onChange={handleCodeEntry}/>
                     
                      
                  </div> 
                     
                 </div> 
   

                <div>
                   
                </div>
                {loading === false ?<div className="form-group">
                                     <input type="submit" className="btn btn-block ov-auth-btn" value="SEND" disabled={disableButton} onClick={validateCode} />
                                     </div> :

                                    <div className="form-group">
                                        <button type="submit" className= "btn btn-block ov-auth-btn">
                                        <div className="spinner-border"></div>
                                        </button>
                                    </div>
                            
                            }
                </> : null

               
                
                }
               
                
           </div>
        </>
    )
}

export default CodeLogin;