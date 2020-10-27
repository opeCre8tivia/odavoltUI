const initialState = {
    storeList:[]
}

const StoreReducer = (state=initialState, action)=>{
    switch(action.type){
        case "FETCH_STORES":
            return {
                ...state,
                storeList:action.payload
            }
        default:
            return state    
    }

}

export default StoreReducer