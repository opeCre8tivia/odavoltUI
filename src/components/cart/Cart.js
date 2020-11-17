import React, {useState, useEffect,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import CartMethods from '../reusable/classes/cartMethods'



const Cart = (props) =>{
    //auth token
    // let authToken = localStorage.getItem('ov_TKN_1aUTh');
    //redux state
    const {cartChange,cartStatus} = useSelector(state=>state.cartReducer);
    const originalProductList = useSelector(state=>state.StoreReducer.particularStoreProducts); //d cart is diffrent 
    const {isAuthenticated} = useSelector(state=>state.AuthReducer);
    const dispatch = useDispatch();

    //component state
    const [cartState, setCartState] = useState({
        productList:[],
        total:0,
        deliveryFee:2000
    })
    const {productList,total, deliveryFee} = cartState;
    const [itemLoading ,setItemLoading] = useState(false);

    //instatiating the cart object
    const cartObject = new CartMethods(dispatch);

    const cartItems = cartObject.getCartItems().cartItems;
    const totalUnitPrice = cartObject.getCartItems().totalUnitPrice
   

    //get all cart items from order tables accordingly
     //useEffect hook
     useEffect(()=>{
            if(cartItems !== null){
                getCartItems();
            }
        },[cartChange])

//      useEffect(()=>{
//             getCartItems();
//            //eslint-disable-next-line
//    },[cartChange]);



   //FUNCTION THAT GETS CART ITEMS  
     function getCartItems(){
       
        if(cartItems === null){
            return null
        }
        setCartState({
            ...cartState,
            productList:cartItems,
            total:totalUnitPrice

        })
   
        }

    /*-------------- crud operations ---------------- */


    //FUNCTION THAT INCREAMENTS CART ITEM PRICE
    const increament=(item)=>{
        cartObject.increament(item)
    }
     
           
    //FUNCTION THAT DECREAMENTS CART ITEM PRICE
     const decreament =  (item) =>{
            cartObject.decreament(item)
        }



    //FUNCTION THAT REMOVES CART ITEMS
    const removeItem =  (id)=>{   
        cartObject.removeItem(id)
        }




    //FUNCTION TO HIDE CART
     const hideCartAction = ()=>{
            cartObject.hideCart()
     }

        /*------------------- useeffect to hide or show thecart --------*/
        useEffect(()=>{
            if(cartStatus === "visible"){
                let cart = document.querySelector('.ov-cart-opaque-wrapper');
                cart.style.left = 0;
            }
            if(cartStatus === "hidden"){
                let cart = document.querySelector('.ov-cart-opaque-wrapper');
                cart.style.left = '-100%';
            }
        },[cartStatus])

     return(
       <div className="ov-cart-opaque-wrapper">
         <div className="ov-cart">
             {/* <Notice/> */}
             <div className="ov-cart-close-btn" onClick={hideCartAction}><p>x</p></div>
             <div className="cart-scroll-cont">
            <div className="ov-cart-header">
                <div className="ov-cart-logo-cont">
                    <img src={require("../../assets/img/ov-letter-logo.svg")} alt="odavolt logo" />
                </div>
             </div>

            


             {
             productList.length !== 0 ?   productList.map(item =><div key={item._id} className="mb-2 cart-item-cont" >
             <div className="ov-cart-cont-inner" >
             <div style={{width:'40%'}}> {item.product.name}</div> <div style={{width:'25%'}} > {item.unitPrice} </div> 
             <button className="btn btn-sm ov-cal-btn"  value={item.product.name} onClick={()=>{ increament(item)}} >  {itemLoading === true ? <img style={{height:'20px',width:'20px'}} src="/ov-btn-spinner.svg" alt="ov-spinner" /> : '+'} </button> 
             <div className="ov-counter"><p>{item.count} </p></div>
               <button className="btn btn-sm ov-cal-btn" value={item.product.name} onClick={()=>decreament(item)} >{itemLoading === true ? <img style={{height:'20px',width:'20px'}} src="/ov-btn-spinner.svg" alt="ov-spinner" /> : '-'} </button> </div>
             <div className="removeItem" onClick={()=>{
                 removeItem(item._id);
             }} ><span>x</span>remove</div>
         </div>
         
         ):
             <div className="ov-cart-empty-text">YOUR CART IS EMPTY </div>
             
            } 
            </div>
            

        
             <div className="ov-cart-summary-cont">
             {productList.length !==0 ? <Fragment><ul>
                            <li><div className="ov-cart-span">Sub-total: </div>{total} </li>
                            <li><div className="ov-cart-span">Tax:</div>0.00</li>
                            <li><div className="ov-cart-span">Delivery Fee:</div> {deliveryFee} </li>
                            <li><div className="ov-cart-span">TOTAL: </div> {total + deliveryFee} </li>
                        </ul>
                         {isAuthenticated === true ?<Link to="/user-dash"  > <button type="button"  className="ov-cart-checkout-btn" onClick={hideCartAction}  >PROCEED TO CHECK OUT</button></Link> :
                          <Link to="/login"  ><button type="button"  className="ov-cart-checkout-btn" onClick={hideCartAction} >PROCEED TO CHECK OUT</button></Link>
                           } </Fragment> :""
                }
             </div>
             
         </div>
      </div>
    )
}

export  default Cart;