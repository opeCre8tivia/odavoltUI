const initialState = {
    loading:false
}

const LoadingReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'LOADING':
            return {
                ...state,
                loading:true
            }
        case 'NOT_LOADING':
            return {
                ...state,
                loading:false
            }
        default:
            return state
    }
}

export default LoadingReducer;