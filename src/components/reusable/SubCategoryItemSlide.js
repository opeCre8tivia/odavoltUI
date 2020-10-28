import React, {useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getProductsByCategory} from '../../redux/actions'
import Ovcarousel from './Ovcarousel'

const SubCategoryItemSlide=({subCategory , storeProducts})=> {
    //global
    let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
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
        storeProducts.forEach(product => { 
            if(product.subCategory === subCategory){
                sorted.push(product)
            }
        });

        setProductList(sorted)
    }

    //function to dispatch action
    const handleDispatch =(category)=>{
        dispatch(getProductsByCategory(category))
            setRedirect(true)
        }


    return (
        <>
        {redirect===true ? <Redirect to="/view/category"> </Redirect> : null}
        <div className="container-fluid item-slide-cont" >
            <div className="section-title">
                <p> {`Buy ${subCategory}`}  </p>
                <button className="btn btn-sm view-more" onClick={()=> handleDispatch(subCategory)}>View More</button>
            </div>
            <Ovcarousel productList={productList} lsItems={lsItems} />

            
        </div>
        </>
    )
}

export default SubCategoryItemSlide