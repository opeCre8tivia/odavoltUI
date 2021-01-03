const initialState = {
    storeList:[],
    testList:[],
    store:null,
    categories:[],
    particularStoreProducts:[],
    storeLoading:true
}

const StoreReducer = (state=initialState, action)=>{
    switch(action.type){
        case "TEST_LIST":
            return{
                ...state,
                testList:action.payload
            }
        case "FETCH_STORES":
           
            return {
                ...state,
                storeList:action.payload,
                storeLoading:false

               
            }
        case "LOAD_ASTORE":
            return {
                ...state,
                store:action.payload
            }
        case 'LOAD_PARTICULAR_STORE_PRODUCTS':
            return {
                ...state,
                particularStoreProducts:action.payload,
                
            }
        case "CLEAR_PARTICULAR_STORE_ITEMS":
            return{
                ...state,
                particularStoreProducts:[]
            }    
        case 'FETCH_CATEGORIES':
            return{
                ...state,
                categories:action.payload
            }
        default:
            return state    
    }

}

export default StoreReducer