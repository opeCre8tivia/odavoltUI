import axios from 'axios'
import {rootapi} from '../../rootapi'


 //product actions
 export const fetchProducts =()=>{
     return async function(dispatch){
            try {
                const res = await axios.get(`${rootapi}/api/storeitem-crud`)
                if(res.data.payload){
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
 
 
 export const getProductsBySubCategory = (storeId)=>{

    return async function(dispatch){
        try {
               
                //fetch products by category
                const res = await axios.get(`${rootapi}/api/storeitem-crud/particular/${storeId}`)
                if(res.data.payload){
                    dispatch({
                        type:"PRODUCTS_BY_CATEGORY",
                        payload:res.data.payload
                    })

                }
               

     

        } catch (err) {
            console.log(err.message)
        }
    }
}

