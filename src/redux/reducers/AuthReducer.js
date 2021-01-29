const initialState = {
    token:null,
    showAuthComponentPopUp:false,
    registered:false,
    isAuthenticated:false,
    isValidated:false,
    user:null,
    loading:false,
    error:null
}

const AuthReducer = (state=initialState, action) =>{
    switch(action.type){
        case "INVALID_OTP_ENTRY":
            return{
                ...state,
                error:action.msg
            }
        case "EMAIL_VALIDATION_FAIL":
            return{
                ...state,
                error:action.msg
            }
        case "VALID_EMAIL":
            localStorage.setItem('_persistA', JSON.stringify(action.payload.id))
            //persist email 
            localStorage.setItem('_persistB', JSON.stringify(action.payload.email))
            return{
                ...state,
                isValidated:true

            }
        case "VALID_OTP":
            return{
                ...state,
                isValidated:"done"

            }

        case "OTP_VALIDATION_FAIL":
                return{
                    ...state,
                    error:action.msg
                }
        case "USER_DATA_LOADING":
            return{
                ...state,
                loading:true
            }
        case "USER_DATA_NOT_LOADING":
            return{
                ...state,
                loading:false
            }
        case 'LOGIN_BTN':
            return{
                ...state,
                showAuthComponentPopUp:true
            }
        case 'USER_LOADED':
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload,
                showAuthComponentPopUp:false
            }
        case 'REGISTER_SUCCESS':
             //set token to local storage
             localStorage.setItem('ov_TKN_aUTh', JSON.stringify(action.payload))
             localStorage.removeItem('OV_Anon_2aUTh');
            return {
                ...state,
                registered:true,
                token:action.payload,
                isAuthenticated:true
            }
        case 'LOGIN_SUCCESS':
            //set token to local storage
            localStorage.setItem('ov_TKN_aUTh', JSON.stringify(action.payload))
            localStorage.removeItem('OV_Anon_2aUTh');
            return{
                ...state,
                isAuthenticated:true,
                loading:false, 
                showAuthComponentPopUp:false 
            }
        case 'REGISTER_FAIL':
        case 'LOAD_USER_FAIL':
        case 'LOG-OUT':
        case 'ANONYMOUS':
            //remove token from local storage
            localStorage.removeItem('ov_TKN_aUTh');
            let anonAuth = localStorage.getItem('OV_Anon_2aUTh');
            const randomId = Math.random()
            anonAuth ? null : localStorage.setItem('OV_Anon_2aUTh', randomId);
            
            return{
                ...state,
                error:action.payload,
                isAuthenticated:false,
                loading:false
            }
        case 'LOGIN_FAIL':
            let _token = localStorage.getItem('ov_TKN_aUTh') 
            if(_token){
                localStorage.removeItem('ov_TKN_aUTh');
            }
            return{
                ...state,
                error:action.payload
            } 
       case "CLEAR_ERROR":
           return{
               ...state,
               error:null
           }     
            
        default:
            return state
    }
}


export default AuthReducer;