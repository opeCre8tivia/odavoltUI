import axios from 'axios'
import {productList} from '../../productList'

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
 
 
 export const getProductsByCategory = (category)=>{

    return function(dispatch){
        //fetch products by category
        console.log('category')
        const res =[
            {
                count: 1,
                instock: true,
                rating: null,
                addedOn: "2020-04-05T23:00:26.384Z",
                deliverToDistrict: "Soroti",
                _id: "5e8a66d08dbee30017657c65",
                cartegory: "Groceries",
                name: "Tomatoes",
                description: "Fresh Organic Tomatoes",
                units: "Kg",
                unitPrice: 2500,
                minPrice: 1000,
                imageUrl: "https://res.cloudinary.com/odavolt/image/upload/v1586128592/mhf8n88zgijbxnh0hv2g.jpg",
                __v: 0
                },
                {
                count: 1,
                instock: true,
                rating: null,
                addedOn: "2020-04-05T23:16:43.179Z",
                deliverToDistrict: "Soroti",
                _id: "5e8a67829392ad001795b689",
                cartegory: "Groceries",
                name: "Rice (Super)",
                description: "Well Polished White Rice",
                units: "Kg",
                unitPrice: 4000,
                minPrice: 2000,
                imageUrl: "https://res.cloudinary.com/odavolt/image/upload/v1586128770/fscvdaixvmsxkkbohvrr.jpg",
                __v: 0
                },
                {
                count: 1,
                instock: true,
                rating: null,
                addedOn: "2020-04-05T23:38:06.249Z",
                deliverToDistrict: "Soroti",
                _id: "5e8a6c637f13de00170711d4",
                cartegory: "Groceries",
                name: "Fresh Beans",
                description: "Shelled Fresh Beans",
                units: "Kg",
                unitPrice: 6000,
                minPrice: 2000,
                imageUrl: "https://res.cloudinary.com/odavolt/image/upload/v1586130019/pkl7tiuuizhdq8co0ecr.jpg",
                __v: 0
                },
                {
                count: 1,
                instock: true,
                rating: null,
                addedOn: "2020-04-05T23:40:37.260Z",
                deliverToDistrict: "Soroti",
                _id: "5e8a6d391bbf560017c79884",
                cartegory: "Groceries",
                name: "Fresh Cow Peas",
                description: "Organic fresh green Cow peas",
                units: "Kg",
                unitPrice: 6000,
                minPrice: 3000,
                imageUrl: "https://res.cloudinary.com/odavolt/image/upload/v1586130233/vgjbsq8whazga0ec1b3m.jpg",
                __v: 0
                }
        ]

        dispatch({
            type:"PRODUCTS_BY_CATEGORY",
            payload:res
        }) 
    }
}

