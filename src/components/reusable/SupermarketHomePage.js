import React, { useState,useEffect } from 'react'
import Nav from '../home/Nav'

import {useSelector,useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {loadAstore,fetchCategories,loadParticularStoreProducts} from '../../redux/actions'

import SubCategoryItemSlide from '../reusable/SubCategoryItemSlide'


const SupermarketHomePage =()=>{
    //global
    const _str_id = JSON.parse(localStorage.getItem("_str"))
    //redux state
    const dispatch = useDispatch()
    const {store,categories,particularStoreProducts} = useSelector(state => state.StoreReducer)

    //component state
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)
    const [subCategories,setSubCategories] = useState([])

   
    
    useEffect(() => {
      
        dispatch(loadAstore(_str_id))
        dispatch(fetchCategories())
        dispatch(loadParticularStoreProducts(_str_id))

    }, [])

    useEffect(() => {
        
        if(store !== null){
            setLoading(false)
        }

    }, [store])

    useEffect(() => {
        sortSubCategories()

    }, [categories])

    const sortSubCategories =()=>{
        categories.forEach((category)=>{
            
            if(category.name === "Groceries"){
                setSubCategories(category.subCategories)
            }
        })
    }
   
    return (
        <div >
            {loading === true ? <div> Loading.... </div> : 
            
            <>
            <Nav/>
            {/* slider area */}
            <div className="supermarket-slider-cont">  
                <div className="supermarket-translucent-cover" > 
                   <div className="supermarket-name" >
                        {store.name}
                    </div>
                </div>       

            </div>

            {/* products by sub category */}

            {
              subCategories.map((subCategory)=> <SubCategoryItemSlide subCategory={subCategory} storeProducts={particularStoreProducts} /> )
            }   

            </> }
        
        </div>
    )
}

export default SupermarketHomePage
