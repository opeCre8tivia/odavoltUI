const initialstate = {
    productList:[],
    productsByCategory:[]
}

const ProductReducer =(state=initialstate, action)=>{
        switch(action.type){
            case 'FETCH_PRODUCTS':
                return{
                    ...state,
                    productList:action.payload
                }
            case 'PRODUCTS_BY_CATEGORY':
                return{
                    ...state,
                    productsByCategory:action.payload
                }

            default:
                return state
        }
}

export default ProductReducer;