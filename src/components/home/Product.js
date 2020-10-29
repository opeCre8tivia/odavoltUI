import React, { useState,useEffect } from 'react'
import {useSelector} from "react-redux"

import AddToCartComponent from '../reusable/addtocart/AddToCartComponent'

const Product=({item})=> {

    //redux
    const {cartChange} = useSelector((state)=>state.cartReducer)
   

    const [itemInLocalStorage,SetItemInLocalStorage]= useState(null)
    

 
      useEffect(() => {
        IsinLocalStorage(item)
        // eslint-disable-next-line   
      },[cartChange])
 
    function IsinLocalStorage(item){
        //find items from  local storage and set to currnet item
        let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
       
        if(lsItems === null){
            return null
        }

        lsItems.forEach((i)=>{
            if(i._id === item._id){
                SetItemInLocalStorage(i)
            }
          
            
        })
        
      }

    return (
     <div className="ov-product-cont" key={item._id}>
                {/* product image section */}
            <div className="ov-product-image-cont">
                {item.product.imageUrls ? <img src={item.product.imageUrls[0]} alt="ov-product" className=" ov-product-image img-fluid"/> :
                    <img src={require("../../assets/img/ov-pix-placeholder.png")} alt="ov-product" className=" ov-product-image img-fluid"/>
                }
            </div>

                {/* product descriptions and prising */}
            <div className="ov-product-name-cont">
                {item.product.name}
            </div>

            <div className="ov-product-description-cont-main">
                <h6>{item.product.shortDescription} </h6>

                <p>1{item.product.units} @{item.unitPrice} Ugx</p>
            </div>

             {/* add to cart section */}
             <div className="ov-product-addtocart-cont">
                   {
                       itemInLocalStorage === null ? <AddToCartComponent item={item} /> :
                       <AddToCartComponent item={itemInLocalStorage} />
                   }
             </div>
        
 </div>
    )
}
export default Product