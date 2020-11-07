import axios from 'axios'
import {rootapi} from '../../rootapi'


 //product actions
 export const fetchProducts =()=>{
     return async function(dispatch){
            try {
                const res = await axios.get(`http://localhost:5000/api/storeitem-crud`)
                if(res.data.payload){
                    console.log("products fetched")
                    dispatch({
                        type:'FETCH_PRODUCTS',
                        payload:res.data.payload
                    })
                }
                
            } catch (error) {
                console.log(error)
            }
         
     }
 }
 
 
 export const getProductsBySubCategory = (subCategory,storeId)=>{

    return async function(dispatch){
        try {
                console.log(storeId)
                //fetch products by category
                const res = await axios.get(`${rootapi}/api/storeitem-crud/particular/${storeId}`)
               

        dispatch({
            type:"PRODUCTS_BY_CATEGORY",
            payload:res.data.payload
        }) 
        } catch (err) {
            console.log(err.message)
        }
    }
}

