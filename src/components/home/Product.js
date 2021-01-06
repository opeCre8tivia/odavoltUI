import React from 'react'

import AddToCartComponent from '../reusable/addtocart/AddToCartComponent'

const Product=({item,manageAutoPlay})=> {

  

     return (
     <div className="ov-product-cont" key={item._id} onClick={manageAutoPlay} onMouseOver={manageAutoPlay} onDrag={manageAutoPlay} >
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

                <p>{item.unitPrice} Ugx</p>
            </div>

             {/* add to cart section */}
             <div className="ov-product-addtocart-cont">
                  
                        <AddToCartComponent item={item} /> 
                      
  
             </div>
        
 </div>
    )
}
export default Product