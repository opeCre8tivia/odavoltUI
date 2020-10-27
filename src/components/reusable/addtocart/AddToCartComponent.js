/*this component is responsible for all the functionality related to
* adding an item to the cart
*/
import React  from 'react'
import {useDispatch,useSelector} from "react-redux";

import RoundBtn from "./RoundBtn"
import CartMethods from '../classes/cartMethods'


const AddToCartComponent =({item})=> {

    //redux state
    const productList = useSelector((state)=>state.ProductReducer.productList)
   

    const dispatch = useDispatch()


  

        /*------------ Add to cart function ----------*/
  const   addToCart =  (item) =>{
             //add isinLocalStorage prop to the item
             item.isinLocalStorage = true;

            const orderz = JSON.parse(localStorage.getItem('ov-client-orders')); //all orders in LS

            /*
            * check if there are orders in local storage with keyword ("ov-client-orders")
            */
            if(orderz===null){
                localStorage.setItem("ov-client-orders", JSON.stringify([item]))
                dispatch({type:"CART_CHANGE"})
                return null
            }

           

            //destructure item object
            const {name} = item;
            // array to copy all the changes to
            let cartItemsArray = []

            // check whether item with the same name already exists in the order  table
                if(orderz !== null){
                const found = orderz.find(order => order.name === name);
                /* if not found
                *   get all the items in Local storage
                *   copy them to cartItemsArray
                *   push the new item
                *   update ov-cart-orders in LS with cartItemsArray
                */ 
                        if(found === undefined){     
                                orderz.forEach(element => {
                                    cartItemsArray.push(element);
                                });
                                
                                cartItemsArray.push(item);

                                localStorage.setItem('ov-client-orders',JSON.stringify(cartItemsArray));
                                dispatch({type:"CART_CHANGE"})

                                    return null;
                        }

                }
              
                      /*  if the item is found  
                      *   call the increament function from the cartObject class
                      *  
                      *
                      */ 
                     console.log(productList)
                const cartObject = new CartMethods(productList,dispatch)
                cartObject.increament(item)
                    
            } 

           function decreament(item){
                const cartObject = new CartMethods(productList,dispatch)
                cartObject.decreament(item)
                
            }



    
    // const showMinusBtn = ()=>{
    //     let minusbtn = document.querySelector('.minus-btn-cont')
    //     let numberbtn = document.querySelector('.number-btn-cont')
    //     let addbtn = document.querySelector('.add-btn-cont')
        
    // }

   
    return (
      <div style={styles.mainContainer}>
            {item.isinLocalStorage === undefined ?  <div style={styles.addTextContainer}>ADD</div> :
                <>
                <div className="minus-btn-cont"><RoundBtn  item={item}  value="-" decreament={decreament} /></div>
            
                <div className="number-btn-cont"> {item.count} </div>
                </>
            }
            
            <div className="plus-btn-cont"><RoundBtn  item={item}  value="+"  addToCart={addToCart} /></div>
        </div>
    )
}

const styles = {
    mainContainer:{
        width:"100px",
	    height:"24px",
	    borderRadius:"12px",
	    marginRight:"2px",
	    backgroundColor:"var(--ov-primary)",
	    position:"relative",
    },
    addTextContainer:{
        position: "absolute",
        left:"10px",
        top:"50%",
        transform: "translateY(-50%)",
        height:"18px",
        width:"40px",
        marginLeft:"2px",
        marginRight:"2px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontFamily:"Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize:"80%",
        color:"#ffffff",
    }
}
export default AddToCartComponent