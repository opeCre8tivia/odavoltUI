/*
* This class when istantited creates a new class object with common cart methods
* ie: addToCart ,increament, decreament, remove item , show cart, hide cart
*/

import {ShowCart,HideCart,cartChange} from '../../../redux/actions'


class CartMethods{
    constructor(dispatch){
        this.productList= JSON.parse(localStorage.getItem("_originals"));
        this.dispatch = dispatch
    }

    /*----------------- Add item to method ----------------*/
   addToCart =  (item) =>{


        //add isinLocalStorage prop to the item
        item.isinLocalStorage = true;

       const orderz = JSON.parse(localStorage.getItem('ov-client-orders')); //all orders in LS

       /*
       * check if there are orders in local storage with keyword ("ov-client-orders")
       */
       if(orderz===null){
           localStorage.setItem("ov-client-orders", JSON.stringify([item]))
           localStorage.setItem("_originals", JSON.stringify([item]))
           this.dispatch({type:"CART_CHANGE"})
           return null
       }

      

       //destructure item object
       const {_id} = item;
       // array to copy all the changes to
       let cartItemsArray = []

       // check whether orderz is not null
           if(orderz !== null){
           const found = orderz.find(order => order._id === _id);
           /* if not found
           *   get all the items in Local storage
           *   copy them to cartItemsArray
           *   push the new item
           *   update ov-cart-orders in LS with cartItemsArray
           * ============== process for adding to cart ===========
           */ 
                   if(found === undefined){     
                           orderz.forEach(element => {
                               cartItemsArray.push(element);
                           });
                           
                           cartItemsArray.push(item);

                           localStorage.setItem('ov-client-orders',JSON.stringify(cartItemsArray));
                           //keep the original un manuplated item for price reference
                            let originalItemArray = []
                            let originals = JSON.parse(localStorage.getItem('_originals'))
                            //pushing the first item
                            if(originals === null){
                                originalItemArray.push(item)
                                localStorage.setItem("_originals", JSON.stringify(originalItemArray))
                              
                            } 
                            else{
                             //pushing following items
                            originals.forEach((e)=> originalItemArray.push(e)) //copy ls items
                            originalItemArray.push(item)
                            //re set array to ls
                            localStorage.setItem('_originals',JSON.stringify(originalItemArray));
                            }



                           this.dispatch({type:"CART_CHANGE"})

                               return null;
                   }

           }
         
                 /*  if the item is found 
                 * dispatch loadParticularStoreProducts to update productList array
                 *   call the increament function from the cartObject class
                 *  
                 * =================== process for increamenting ===========
                 */ 
              
          
          
           this.increament(item) 
               
       } 

   /*----------------- Get cart items method ----------------*/
     getCartItems(){
       
        //overall -  get items from the local storage
        const cartItems = JSON.parse(localStorage.getItem('ov-client-orders'));
        if(cartItems === null){
            return null
        }

        // check if there are any cart items
        if(cartItems === undefined){
            return{
                cartItems:null,
                totalUnitPrice:null
            }
        }

         
        if(cartItems !== null){

            //set local storage
            localStorage.setItem("ov_crt_len", cartItems.length)
             //get their total for every fetch
            let  totalUnitPrice = cartItems.reduce((total,item)=>{
            return  total+ parseInt(item.unitPrice);
             },0)

            return{
            cartItems:cartItems,
            totalUnitPrice:totalUnitPrice
            }
        }
       

       
   }
   
  /*----------------- Increament method ----------------*/

  increament =  (item) =>{
                    /*
                    *  to increament the price and the count of the product we need two versions of the product
                    *   one- from local storage, that we are updating
                    *   two- from the original product state so that we can change price using themethod below
                    *  newprice = currentprice + original price
                    */

                    let {unitPrice,count,_id} = item;
                   
                   
                    count += 1;

                    //finding original price from redux product state
                    let origList = this.productList;
            
                    let copy = origList.find(i => i._id === _id);
                    if(copy === undefined){
                        return null
                    }
                    
                    let originalPrice = copy.unitPrice; 

                    //increament units

                let localArray = [];

                let orderz = JSON.parse(localStorage.getItem('ov-client-orders'));
                //append this item to a new array;
                orderz.forEach(i => {
                    localArray.push(i);
                })

                //find item in the array
                let found = localArray.find(element=> element._id === _id);
                
                //update its units
                found.count= count;
                found.unitPrice = unitPrice + originalPrice ;
                
                
                //get its index so that we can update
                let idx = localArray.findIndex(i=>i._id === found._id);
                

                // update item
                localArray[idx]=found;

                //push back to local s 

                localStorage.setItem('ov-client-orders', JSON.stringify(localArray));
                this.dispatch(cartChange());
                
           }


       /*----------------- decreament method ----------------*/
       
       decreament =  (item) =>{

        let {unitPrice,count,_id} = item;
  

        count -= 1;

        //remove the item if count value is less than 1
        if(count < 1){
            this.removeItem(item._id);
            return null;
        }

        //finding original price
        let origList = this.productList
        let copy = origList.find(i => i._id === _id);
         
        let originalPrice = copy.unitPrice; 

        //increament units

       let localArray = [];

       let orderz = JSON.parse(localStorage.getItem('ov-client-orders'));
       //append this item to a new array;
       orderz.forEach(i => {
           localArray.push(i);
       })

       //find item in the array
       let found = localArray.find(element=> element._id === _id);
   
       //update its units
       found.count= count;
       found.unitPrice = unitPrice - originalPrice ;
       
       
       //get its index so that we can update
       let idx = localArray.findIndex(i=>i._id === found._id);
      

       // update item
       localArray[idx]=found;

       //push back to local s 

       localStorage.setItem('ov-client-orders', JSON.stringify(localArray));
       this.dispatch(cartChange());
    }



  /*----------------- remove item method ----------------*/

    removeItem =  (id)=>{

        let localArray = [];
        let originalsArray = []
        let orderz = JSON.parse(localStorage.getItem('ov-client-orders'))
        let originals = JSON.parse(localStorage.getItem('_originals'))

        if(orderz === null){
            this.dispatch(cartChange());
            return null
        }

        //remove item from ov-client-orders
        let found = orderz.find(item => item._id === id);
    
        orderz.forEach(e => {
            if(e._id !== found._id){
                localArray.push(e);
            }
        })
        //set new array
        localStorage.setItem('ov-client-orders', JSON.stringify(localArray));
        this.dispatch(cartChange());

        //remove item from _originals
        let foundOriginal = originals.find(item => item._id === id);
    
        originals.forEach(e => {
            if(e._id !== foundOriginal._id){
                originalsArray.push(e);
            }
        })
        //set new array
        localStorage.setItem('_originals', JSON.stringify(originalsArray));
        this.dispatch(cartChange());

      
    
    }

     /*----------------- hide cart method ----------------*/
    hideCart = ()=>{
        this.dispatch(HideCart())
        }
    /*----------------- show cart method ----------------*/
    showCart = ()=>{
        this.dispatch(ShowCart())
        }
    
         

}

export default CartMethods