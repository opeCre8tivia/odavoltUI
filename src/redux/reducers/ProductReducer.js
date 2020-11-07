const initialstate = {
    productList:[],
    productsBySubCategory:[]
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
                    productsBySubCategory:action.payload
                }

            default:
                return state
        }
}

export default ProductReducer;