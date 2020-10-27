import React, {useState} from 'react'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'

const ManageProducts=()=> {

   const [productRouter, setProductRouter] = useState("addproduct")



    return (
        <div className="ov-dash-component-wrapper">
          <div className="manage-product-nav">
              <div onClick={()=> setProductRouter("addproduct")}>
                   <span> <i className="fa fa-plus-circle" style={{marginRight:"5px"}}></i>  </span> Add Product
              </div>

              <div onClick={()=> setProductRouter("editproduct")}>
                   <span> <i className="fa fa-pen-nib" style={{marginRight:"5px"}}></i>  </span>  Edit Product
              </div>
         </div>

            {/* using state to conditionally render */}
            {productRouter === "addproduct" ? <AddProduct/> :
                <EditProduct/>
            }

        </div>


      
    )
}

export default ManageProducts
