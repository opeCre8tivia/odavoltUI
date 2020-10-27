import React, { useState, Fragment } from 'react';
//import {useDispatch} from 'react-redux';









const AddToCartBtn = ({item,value,showMinusBtn}) =>{

        //public variables
        //let lsItemz = JSON.parse(localStorage.getItem('ov-client-orders'));

        //redux
       // const  dispatch = useDispatch()
        //const cartChange = useSelector(state => state.cartReducer.cartChange);
       
        //component state
//         const [productLoading, setProductLoading] = useState(false);        
       

//         /*use effect to show add-minus for every item on local storage
//         * to be called when component renders and when item there is change in local storage
//         * to be called on cart change
//         */

//    const showAddedAlert = ()=>{
//     let alert = document.querySelector('.ov-addtocart-alert');
//     alert.style.opacity = '1';
    
// }

// const HideAddedAlert = ()=>{
//     let alert = document.querySelector('.ov-addtocart-alert');
//     alert.style.opacity = '0';
    
// }



//     //add to cart function
//   const   addToCart =  (targetBtn,item) =>{
            
//             localStorage.setItem('item', JSON.stringify(item));

//             //destructure item object
//             const {name} = item;

//              setProductLoading(true) // action to trigger spinner

    
      
          

            
//             let cartItemArray = []
            

//             const orderz = JSON.parse(localStorage.getItem('ov-client-orders'));

            
             //check whether item with the same name already exists in the order  table
                
                // if(orderz !== null){
                // const found = orderz.find(order => order.name === name);
                // if(found){
                //          console.log('item already exists');
                //          setProductLoading(false)
                //             //prevent  it from getting added again
                //             return null;
                // }

                // }
              
                      /* add item to local storage in three steps
                      *   use unshift to add it to the begining
                      *
                      */ 

                      
            //          if(orderz === null){ //adding the very first item
            //              let x = [item]
            //             localStorage.setItem('ov-client-orders', JSON.stringify(x));
            //             //set a copy for price refrence
            //             localStorage.setItem('ov-client-orders-original', JSON.stringify(x));
                        

            //            let msg =  "Item added"  //work on this later (prove that the item has been added)
                         
            //             if(msg === "Item added"){
                         
            //                dispatch({type:'ITEM_ADDED'});
            //                dispatch({type:'CART_CHANGE'});
            //                showAddedAlert();
            //                setTimeout(()=>{
            //                    setProductLoading(false)
            //                    HideAddedAlert();
                               
            //                },2000)
            //            }
                        
            //             return null;
            //         }



            //          orderz.forEach(element => {
            //             cartItemArray.push(element);
            //           });
                     
            //           cartItemArray.push(item);
            //           localStorage.setItem('ov-client-orders',JSON.stringify(cartItemArray));
            //            //set a copy for price refrence
            //            localStorage.setItem('ov-client-orders-original', JSON.stringify(cartItemArray));
                      
            //           let msg =  "Item added"  //work on this later (prove that the item has been added)
                         
            //                if(msg === "Item added"){
                            
            //                   dispatch({type:'ITEM_ADDED'});
            //                   dispatch({type:'CART_CHANGE'});
            //                   showAddedAlert();
            //                   setTimeout(()=>{
            //                       setProductLoading(false)
            //                       HideAddedAlert();
                                  
            //                   },2000);
            //               }
             
             
                
            // }  
 

    const productLoading = false;
    return(
        <>
     
        
            <div className="ov-addtocart-btn" onClick={(e)=>{
                showMinusBtn()  
            }}>
                {productLoading === true ? <img style={{height:'20px',width:'20px',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} src="/ov-btn-spinner.svg" alt="ov-spinner" /> : <p id="child" >{value} </p>}
            </div>
    

        </>
    )
}

export  default AddToCartBtn;