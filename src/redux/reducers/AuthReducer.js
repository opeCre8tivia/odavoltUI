const initialState = {
    token:null,
    showAuthComponentPopUp:false,
    registered:false,
    isAuthenticated:false,
    user:null,
    loading:false,
    error:null
}

const AuthReducer = (state=initialState, action) =>{
    switch(action.type){
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
            return {
                ...state,
                registered:true,
                token:action.payload
            }
        case 'LOGIN_SUCCESS':
            //set token to local storage
            localStorage.setItem('ov_TKN_aUTh', JSON.stringify(action.payload))
            return{
                ...state,
                isAuthenticated:true,
                loading:false, 
                showAuthComponentPopUp:false 
            }
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOG-OUT':
        case 'ANONYMOUS':
            //remove token from local storage
            localStorage.removeItem('ov_TKN_aUTh');
            let anonAuth = localStorage.getItem('OV_Anon_2aUTh');
            const randomId = Math.random()
            anonAuth ? console.log('Not authed') : localStorage.setItem('OV_Anon_2aUTh', randomId);
            
            return{
                ...state,
                error:action.payload,
                isAuthenticated:false
            }
        case 'LOGIN_FAIL':
            return{
                ...state,
                error:action.payload
            }    
        default:
            return state
    }
}


export default AuthReducer;