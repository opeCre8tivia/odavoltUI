/*
* This class when istantited creates a new class object with common cart methods
* ie: increament, decreament, remove item , show cart, hide cart
*/

import {ShowCart,HideCart,cartChange} from '../../../redux/actions'

class CartMethods{
    constructor(productList,dispatch){
        this.productList=productList;
        this.dispatch = dispatch
    }
  
   /*----------------- Get cart items method ----------------*/
     getCartItems(){
       
        //overall -  get items from the local storage
        const cartItems = JSON.parse(localStorage.getItem('ov-client-orders'));
       
        // check if there are any cart items
        if(cartItems === null){
            console.log('no items in cart');
            return{
                cartItems:null,
                totalUnitPrice:null
            }
        }

         //set local storage
         localStorage.setItem("ov_crt_len", cartItems.length);
        //get their total for every fetch
        let  totalUnitPrice = cartItems.reduce((total,item)=>{
                                return  total+ parseInt(item.unitPrice);
                                 },0)
       
        return{
            cartItems:cartItems,
            totalUnitPrice:totalUnitPrice
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

                    let {unitPrice,count} = item;
                    let {name}=item.product
                   
                    count += 1;

                    //finding original price from redux product state
                    let origList = this.productList;
                    console.log(origList)
                    let copy = origList.find(i => i.name === name);
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
                let found = localArray.find(element=> element.name === name);
                
                //update its units
                found.count= count;
                found.unitPrice = unitPrice + originalPrice ;
                
                
                //get its index so that we can update
                let idx = localArray.findIndex(i=>i.name === found.name);
                

                // update item
                localArray[idx]=found;

                //push back to local s 

                localStorage.setItem('ov-client-orders', JSON.stringify(localArray));
                this.dispatch(cartChange());
                
           }


       /*----------------- decreament method ----------------*/
       
       decreament =  (item) =>{

        let {unitPrice,count} = item;
        let {name}= item.product

        count -= 1;

        //remove the item if count value is less than 1
        if(count < 1){
            this.removeItem(item._id);
            return null;
        }

        //finding original price
        let origList = this.productList
        let copy = origList.find(i => i.name === name);
         
        let originalPrice = copy.unitPrice; 

        //increament units

       let localArray = [];

       let orderz = JSON.parse(localStorage.getItem('ov-client-orders'));
       //append this item to a new array;
       orderz.forEach(i => {
           localArray.push(i);
       })

       //find item in the array
       let found = localArray.find(element=> element.name === name);
   
       //update its units
       found.count= count;
       found.unitPrice = unitPrice - originalPrice ;
       
       
       //get its index so that we can update
       let idx = localArray.findIndex(i=>i.name === found.name);
      

       // update item
       localArray[idx]=found;

       //push back to local s 

       localStorage.setItem('ov-client-orders', JSON.stringify(localArray));
       this.dispatch(cartChange());
    }



  /*----------------- remove item method ----------------*/

    removeItem =  (id)=>{

        let localArray = [];
        let orderz = JSON.parse(localStorage.getItem('ov-client-orders'))
        if(orderz === null){
            this.dispatch(cartChange());
            return null
        }
        let found = orderz.find(item => item._id === id);
    
        orderz.forEach(e => {
            if(e._id !== found._id){
                localArray.push(e);
            }
        })
    
        //set new array
        localStorage.setItem('ov-client-orders', JSON.stringify(localArray));
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