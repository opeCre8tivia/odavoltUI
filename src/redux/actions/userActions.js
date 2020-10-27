import axios from 'axios'
import setAuthToken from '../../Utils/setAuthToken'
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
    return function(dispatch){

        if(token !== null){

            axios.defaults.headers.common['x-auth-token'] = token; //set headers

            axios.get(`${rootapi}/api/auth`)
            .then(res => {
                dispatch({
                            type:'USER_LOADED',
                            payload:res.data    
                        })

            } )
            .catch(err => {
                if(err){
                    dispatch({
                        type:'AUTH_ERROR'
                    })
                }
            })

        }
        
        

       
    }
}


//login user action

export const LoginUserAction = (formData) =>{
   
    return async function (dispatch){
      try {

        let res = await axios.post(`${rootapi}/api/login-user`, formData); //res contains user data
      
        if(res.data.error === true){
            dispatch({
                type:'LOGIN_FAIL',
                payload:res.data.msg
               
            });
            dispatch({
                type:'NOT_LOADING'
            })
        }
        else{
        
           
            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res.data.payload
            })

            dispatch({
                type:'NOT_LOADING'
            })
    
            
        }
                 
      } catch (err) {
          console.log(err);
        
      }
       
    }
}

