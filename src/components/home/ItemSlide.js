import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getProductsByCategory} from '../../redux/actions'
import Ovcarousel from '../reusable/Ovcarousel'

const ItemSlide=({category})=> {
        //redux state
    const dispatch = useDispatch()
    const {productList }= useSelector(state => state.ProductReducer)
   


    //component state
    const [redirect, setRedirect] = useState(false);

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
                <p> {`Buy ${category}`}  </p>
                <button className="btn btn-sm view-more" onClick={()=> handleDispatch(category)}>View More</button>
            </div>
            <div>seen...</div>
            <Ovcarousel productList={productList}  />

            
        </div>
        </>
    )
}

export default ItemSlide
