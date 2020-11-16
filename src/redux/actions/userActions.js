import axios from 'axios'
// import setAuthToken from '../../Utils/setAuthToken'
import {rootapi} from '../../rootapi'



//register user actions
export const RegisterUserAction = (formData)=>{
    return async function(dispatch){
            //destructure formData
            const {name, email, mobile, password} = formData
            //make arequest to api/users  and return a token
            try{

                const res = await axios.post(
                    `${rootapi}/api/register-user`,
                    {
                        name,
                        email,
                        mobile,
                        password
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

                
            }
            catch(err){
               console.log(err)

                dispatch({
                    type:'NOT_LOADING'
                })
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
                    console.log('loading...')
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

        // let res = await axios.post(`${rootapi}/api/login-user`, formData); //res contains user data
        let res = await axios.post(`http://localhost:5000/api/login-user`, formData); //res contains user data
            console.log(res)
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

