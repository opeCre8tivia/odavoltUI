import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import CartMethods from '../reusable/classes/cartMethods'


const CartButton= (props) =>{
      //component state
      const [totalCartItemCount, setTotalCartItemCount] = useState(0)
     //redux state
     const {cartChange} = useSelector(state=>state.cartReducer);
     const dispatch = useDispatch();
    

    useEffect(()=>{
        getTotalCartItemCount()
   },[cartChange])

function getTotalCartItemCount(){
        //get all local storage items
        let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
        if(lsItems === undefined){
            return null
        }
        else if (lsItems === null){
            return null
        }
        else{
            let total = 0;
            lsItems.forEach(item => {
                total = total + item.count
            
        });

        setTotalCartItemCount(total)
        }

        
}


    const showCartAction = ()=>{
        const cartObject = new CartMethods(dispatch)
        cartObject.showCart()
    }

     return(
              
     <div className="nav-cart-button" onClick={showCartAction} >
         <div className="nav-cart-img-cont">
           <span > <i className="fas fa-cart-arrow-down ov-cart-img"></i></span>
         </div>
         <div className="nav-cartitems-number">{totalCartItemCount}</div>
     </div>
    )
}

export  default CartButton;