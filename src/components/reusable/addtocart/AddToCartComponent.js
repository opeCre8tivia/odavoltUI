/*this component is responsible for all the functionality related to
* adding an item to the cart
*/
import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux";

import CartMethods from '../classes/cartMethods'



const AddToCartComponent =({item})=> {
    
    //component state
    const [itemInLocalStorage,SetItemInLocalStorage]= useState(item)
    //redux state
    const dispatch = useDispatch()
    const {cartChange} = useSelector((state)=>state.cartReducer)

    
      useEffect(() => {
        IsinLocalStorage(item)
        // eslint-disable-next-line   
      },[cartChange])


 
    function IsinLocalStorage(item){
        //find items from  local storage and set to currnet item
        let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
        if(lsItems === null){
            //remove the isinLocalStorage prop or set to undefined
            let i = item
           i.isinLocalStorage = false
            SetItemInLocalStorage(i)
            return null
        }
        else if ( lsItems.length === 0){
            //remove the isinLocalStorage prop or set to undefined
            let i = item
            i.isinLocalStorage = false
            SetItemInLocalStorage(i)
            return null
        }

        //if items are in local storage .... we need to check if current item exists
            let found = lsItems.find((i)=> i._id === item._id)

            if(found !== undefined){
                found.isinLocalStorage = true //OVERwrite
                SetItemInLocalStorage(found)
            }
            else if(found === undefined){
                let i = item
                i.isinLocalStorage = false 
                SetItemInLocalStorage(i)
                
            }
        
      }


  

        /*------------ Add to cart function ----------*/
        const  addToCart =  (item) =>{
            const cartObject = new CartMethods(dispatch)
            cartObject.addToCart(item)
        }
        

           function decreament(item){
               
                const cartObject = new CartMethods(dispatch)
                cartObject.decreament(item)
                
            }
           function increament(item){
               
                const cartObject = new CartMethods(dispatch)
                cartObject.increament(item)
                
            }  


    return (

      <div style={styles.mainContainer}>
            { itemInLocalStorage.isinLocalStorage === true ?  <div> 
                <div className="minus-btn-cont"  onClick={()=>{
                   decreament(item)
                   }} >
                       <i className="fa fa-minus-circle " style={styles.icons} ></i>
               </div>
            
            <div className="number-btn-cont"> {itemInLocalStorage.count} </div>


            <div className="plus-btn-cont"  onClick={()=>{
                   increament(item)
                   }} >
                       <i className="fa fa-plus-circle " style={styles.icons} ></i>
            </div>
                </div> :
                
                <>
                <div style={styles.addTextContainer}>ADD</div> 
               
                <div className="plus-btn-cont"  onClick={()=>{
                   addToCart(item)
                   }} >
                       <i className="fa fa-plus-circle " style={styles.icons} ></i>
               </div>

                </>
            }
            
  
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
    },
    icons:{
        color:'#fff',
        fontSize:"20px"

    }

}
export default AddToCartComponent