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
        case 'ORDER_FAIL':
            alert('Your order HAS NOT been place.... please try again')
            return {
                ...state,
                orderSubmitted:false 
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