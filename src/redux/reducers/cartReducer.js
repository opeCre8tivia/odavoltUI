const initialState ={
    cartStatus:'hidden',
    itemAdded:0,
    cartChange:false,
    loading:false
}

const cartReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SHOW_CART':
            return ({
                ...state,
                cartStatus:'visible'
            });
        case 'HIDE_CART':
            return {
                ...state,
                cartStatus:'hidden'
            }
        case "ITEM_LODAING":
            return{
                ...state,
                loading:true
            }
         case 'ITEM_ADDED':
                let count = Math.random();
                
                return {
                    ...state,
                    itemAdded:count,
                    loading:false 
                }
        case 'CART_CHANGE':
                    return {
                        ...state,
                        cartChange:true,
                        
                    }
        case 'CART_NORMALISE':
                    return{
                        ...state,
                        cartChange:false
                    }
                   
        default:
            return state
    }
}

export default cartReducer;