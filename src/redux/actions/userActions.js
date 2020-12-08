import axios from 'axios'
// import setAuthToken from '../../Utils/setAuthToken'
import {rootapi} from '../../rootapi'



//register user actions
export const RegisterUserAction = (formData)=>{
    return async function(dispatch){
            //destructure formData
            const {firstName, lastName, mobile} = formData
            let email = JSON.parse(localStorage.getItem('_persistB'))
            //make arequest to api/users  and return a token
            try{

                 //set user action loading to true
                 dispatch({
                    type:"USER_DATA_LOADING"
                })

                const res = await axios.post(
                    `${rootapi}/api/register-user`,
                    {
                        firstName,
                        lastName,
                        email,
                        mobile,
                        device:navigator.userAgent
                    }
    
                )
             
                //check for server errors
                if(res.data.error === true){
                    dispatch({
                        type:'REGISTER_FAIL',
                        payload:res.data.msg //error message
                    })
                    return null
                }
                

                dispatch({
                    type:'REGISTER_SUCCESS',
                    payload:res.data.payload,
                    msg:res.data.msg 
                })

                dispatch({
                    type:'NOT_LOADING'
                })
               
                 dispatch({
                    type:"USER_DATA_NOT_LOADING"
                })

                //delete token from db after the use is successfully logged in
                let id = JSON.parse(localStorage.getItem('_persistA'))
                
                await axios.delete(`${rootapi}/api/otp/${id}`)

                
            }
            catch(error){
                console.log(error.message)
                if(error.message === 'Network Error'){
                    dispatch({
                      type: 'LOADING'
                    })
                    dispatch({
                      type: 'NETWORK_OFF'
                    })
                  }
            }

        
    }
}


export function ValidateEmail(formData){
        return async function (dispatch){
            
            try {

                 //set user action loading to true
                 dispatch({
                    type:"USER_DATA_LOADING"
                })

                let res = await axios.post(`${rootapi}/api/signup-auth`, formData)
                

                if(res.data.error === false){
                    
                    dispatch({
                        type:"VALID_EMAIL",
                        payload:res.data.payload //otp id & email
                    })

                    dispatch({
                        type:"USER_DATA_NOT_LOADING"
                    })
                    dispatch({
                        type: 'NETWORK_ON'
                      })
                }
                else{
                    dispatch({
                        type:"EMAIL_VALIDATION_FAIL",
                        msg:res.data.msg
                    })
                    dispatch({
                        type:"USER_DATA_NOT_LOADING"
                    })
                    dispatch({
                        type: 'NETWORK_ON'
                      })
                }
                
            } catch (error) {
                console.log(error.message)
                if(error.message === 'Network Error'){
                    dispatch({
                      type: 'LOADING'
                    })
                    dispatch({
                      type: 'NETWORK_OFF'
                    })

                    dispatch({
                        type:"USER_DATA_NOT_LOADING"
                    })
                  }
            }
        }
}




export function ValidateLoginEmail(formData){
        return async function (dispatch){

          
            
            try {

                 //set user action loading to true
                 dispatch({
                    type:"USER_DATA_LOADING"
                })

                let res = await axios.post(`${rootapi}/api/login-auth`, formData)
                

                if(res.data.error === false){
                    
                    dispatch({
                        type:"VALID_EMAIL",
                        payload:res.data.payload //otp id & email
                    })

                    dispatch({
                        type:"USER_DATA_NOT_LOADING"
                    })
                    dispatch({
                        type: 'NETWORK_ON'
                      })
                }
                else{
                    dispatch({
                        type:"EMAIL_VALIDATION_FAIL",
                        msg:res.data.msg
                    })
                    dispatch({
                        type:"USER_DATA_NOT_LOADING"
                    })
                    dispatch({
                        type: 'NETWORK_ON'
                      })
                }
                
            } catch (error) {
                console.log(error.message)
                if(error.message === 'Network Error'){
                    dispatch({
                      type: 'LOADING'
                    })
                    dispatch({
                      type: 'NETWORK_OFF'
                    })

                    dispatch({
                        type:"USER_DATA_NOT_LOADING"
                    })
                  }
            }
        }
}



export function ValidateOTP(otp){
        return async function (dispatch){
                try {

                    if(otp === null){
                        dispatch({
                            type:"INVALID_OTP_ENTRY",
                            msg:"Re-enter Code"
                        })
                        return null
                    }
                     //set user action loading to true
                     dispatch({
                        type:"USER_DATA_LOADING"
                    })
                    let id = JSON.parse(localStorage.getItem('_persistA'))
                    if(id === null || id === undefined){
                        dispatch({
                            type:"INVALID_OTP_ENTRY",
                            msg:"Re-enter Code"
                        })
                        return null
                    }
                    let res = await axios.post(`${rootapi}/api/otp/${id} `, {otp:otp})
                    if(res.data.error === false){
                        dispatch({
                            type:'VALID_OTP'
                        })
                        dispatch({
                            type:"USER_DATA_NOT_LOADING"
                        })
                    }
                    else{


                        dispatch({
                            type:'OTP_VALIDATION_FAIL',
                            msg: res.data.msg
                        })

                        dispatch({
                            type:"USER_DATA_NOT_LOADING"
                        })
                    }

                    
                } catch (error) {
                    console.log(error.message)
                    if(error.message === 'Network Error'){
                        dispatch({
                          type: 'LOADING'
                        })
                        dispatch({
                          type: 'NETWORK_OFF'
                        })
                        dispatch({
                            type:"USER_DATA_NOT_LOADING"
                        })
                      }

                      
                }
        }
}
export function ValidateLoginOTP(otp){
        return async function (dispatch){
                try {

                    if(otp === null){
                        dispatch({
                            type:"INVALID_OTP_ENTRY",
                            msg:"Re-enter Code"
                        })
                        return null
                    }
                     //set user action loading to true
                     dispatch({
                        type:"USER_DATA_LOADING"
                    })
                    let id = JSON.parse(localStorage.getItem('_persistA'))
                    if(id === null || id === undefined){
                        dispatch({
                            type:"INVALID_OTP_ENTRY",
                            msg:"Re-enter Code"
                        })
                        return null
                    }
                    let res = await axios.post(`${rootapi}/api/otp/login/${id} `, {otp:otp})
                  
                    if(res.data.error === false){
                        dispatch({
                            type:'LOGIN_SUCCESS',
                            payload:res.data.payload
                        })

                        dispatch({
                            type:'VALID_OTP'
                        })

                       
                        dispatch({
                            type:"USER_DATA_NOT_LOADING"
                        })
                    }
                    else{


                        dispatch({
                            type:'OTP_VALIDATION_FAIL',
                            msg: res.data.msg
                        })

                        dispatch({
                            type:"USER_DATA_NOT_LOADING"
                        })
                    }

                    
                } catch (error) {
                    
                    if(error.message === 'Network Error'){
                        dispatch({
                          type: 'LOADING'
                        })
                        dispatch({
                          type: 'NETWORK_OFF'
                        })
                        dispatch({
                            type:"USER_DATA_NOT_LOADING"
                        })
                      }

                      
                }
        }
}




//load user action
/*LoadUser action  => hits /api/user endpoint with a token set on the header
*  gets back user data and sends it in the pay load
*/
export  const LoadUser = (token) =>{
    return async function(dispatch){
            
        try { 
        
            if(token !== null){
                axios.defaults.headers.common['x-auth-token'] = token; //set headers
                
                const res = await axios.get(`${rootapi}/api/auth`)
              
                if(!res){
                 
                    dispatch({
                        type:'LOADING'
                    })
                }

                if(res.data.payload){ 
                    dispatch({
                        type:'USER_LOADED',
                        payload:res.data    
                     })
                 
                    dispatch({
                            type:'NOT_LOADING'
                        })  
    
                }
    
            }
            else{
                dispatch({
                    type:'LOAD_USER_FAIL',   
                }) 
           }
            
           } catch (err) {

            if(err.message === "Network Error"){
                dispatch({
                    type:'LOAD_USER_FAIL',
                    payload:"Login Error Try Again Later" 
                });
                dispatch({
                    type:'NOT_LOADING'
                })
                dispatch({
                    type:'NETWORK_OFF'
                })
    
              }
              else if(err){
                dispatch({
                    type:'LOAD_USER_FAIL',
                    payload:"Login Error Try Again Later" 
                   
                });
                dispatch({
                    type:'NOT_LOADING'
                })
              }
               console.log(err.message)
           } 
    }
}


//login user action

export const LoginUserAction = (formData) =>{
   
    return async function (dispatch){
      try {

         let res = await axios.post(`${rootapi}/api/login-user`, formData); //res contains user data
           
            dispatch({
                type:'LOADING'
            })

        if(res.data.error === true){
            dispatch({
                type:'LOGIN_FAIL',
                payload:res.data.msg
               
            });
            dispatch({
                type:'NOT_LOADING'
            })
        }
        else if (res.data.error === false){
           
            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res.data.payload
            })

            dispatch({
                type:'NOT_LOADING'
            })
    
            
        }
                 
      } catch (err) {
          if(err.message === "Network Error"){
            dispatch({
                type:'LOGIN_FAIL',
                payload:"Login Error Try Again Later" 
            });
            dispatch({
                type:'NOT_LOADING'
            })
            dispatch({
                type:'NETWORK_OFF'
            })

          }
          else if(err){
            dispatch({
                type:'LOGIN_FAIL',
                payload:"Login Error Try Again Later" 
               
            });
            dispatch({
                type:'NOT_LOADING'
            })
          }
          console.log(err);
         
        
      }
       
    }
}

