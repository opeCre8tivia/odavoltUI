import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import CartMethods from '../reusable/classes/cartMethods'


const Cartfab= (props) =>{

     //redux state
     const {itemAdded, cartChange, cartStatus} = useSelector(state=>state.cartReducer);
     const productList = useSelector(state=>state.ProductReducer.productList);
     const dispatch = useDispatch();


    const [cartIconState, setCartIcontState] = useState({
        cartLength:0
    })

    const {cartLength} = cartIconState;
    

      useEffect(()=>{
       getCartItems()
        //eslint-disable-next-line
   },[itemAdded,cartChange]);


//    //FUNCTION THAT GETS CART ITEMS  
   function getCartItems(){

           //get length of current orders
           let cartItems = JSON.parse(localStorage.getItem('ov-client-orders'));
           if(cartItems !== null){
            setCartIcontState({
                ...cartIconState,
                cartLength:cartItems.length
            })
        }
        
    }


    const showCartAction = ()=>{
        const cartObject = new CartMethods(dispatch)
        cartObject.showCart()
    }

    /*--------- useEffect to show and hide the fab depending on redux state ------*/
    // useEffect(() => {
    //    if(cartStatus === "visible"){
    //     let cartIcon = document.querySelector('.ov-cart-button');
    //     cartIcon.style.display = 'none';
    //     console.log('hide fab');
    //    }

    //    if(cartStatus ==="hidden"){
    //     let cartIcon = document.querySelector('.ov-cart-button');
    //     cartIcon.style.display = 'block';
    //     console.log('show fab');
    //    }

    

    // },[cartStatus])

    return(
              
     <div className="ov-cart-button" onClick={showCartAction} >
         <div className="ov-cartitems-number"><p>{cartLength} </p></div>
         <div className="ov-cart-img-cont">
           <span style={{background:'black'}}> <i className="fas fa-cart-arrow-down ov-cart-img"></i></span>
         </div>
     </div>
    )
}

export  default Cartfab;