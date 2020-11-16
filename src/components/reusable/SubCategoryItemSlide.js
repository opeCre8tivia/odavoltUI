import React, {useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getProductsBySubCategory} from '../../redux/actions'
import Ovcarousel from './Ovcarousel'

const SubCategoryItemSlide=({subCategory , storeProducts})=> {
     //redux state
    const dispatch = useDispatch()
    const [productList, setProductList] = useState([])
   


    //component state
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        sortStoreProducts()
    }, [])

 

    //fuction to sort storeProducts
    const sortStoreProducts =()=>{
        let sorted = []
        storeProducts.forEach(storeProduct => {
            if(storeProduct.product.subCategory === subCategory){
                sorted.push(storeProduct)
            }
        });

        setProductList(sorted)
    }

    //function to dispatch action
    const handleDispatch =(subCategory,storeId)=>{
        dispatch(getProductsBySubCategory(subCategory,storeId))
            setRedirect(true)
        }

     
    return (
        <>
        {/* {redirect===true ? <Redirect to="/view/category"> </Redirect> : null} */}
        <div className="container-fluid item-slide-cont" >
            <div className="section-title">
                <p> {`Buy ${subCategory}`}  </p>
                
               <Link to={{pathname:`/view/category/${storeProducts[0].storeId}`,state:`${storeProducts[0].storeId}` }} ><button className="btn btn-sm view-more" onClick={()=> handleDispatch(subCategory,storeProducts[0].storeId)}>View More</button></Link>
              
            </div>
            {
            productList.length > 0 ? <Ovcarousel productList={productList} /> : null
            }

            
        </div>
        </>
    )
}

export default SubCategoryItemSlide