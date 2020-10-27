const initialState = {
    orderSubmitted:false,
    loading:false
    
}

const ClientDashReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'ORDER_SUCCESS':
            return {
                ...state,
                orderSubmitted:true
            }
        case 'NOTIFICATION_SEEN':
            return {
                ...state,
                orderSubmitted:false
            }
        
        default:
            return state;
    }
}

export default ClientDashReducer;