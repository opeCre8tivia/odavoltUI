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
        console.log('count')
        getTotalCartItemCount()
   },[cartChange])

function getTotalCartItemCount(){
        //get all local storage items
        let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
        console.log(lsItems)
        if(lsItems === undefined){
            return null
        }
        
        // let total =   lsItems.reduce((acc,item)=>{
        //     console.log('acc')
        //     return acc + parseInt(item.count)
           
        // },0)

        let total = 0;
      lsItems.forEach(item => {
        total = total + item.count
            
        });


        console.log(total)
        console.log(typeof(total))
        setTotalCartItemCount(total)
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