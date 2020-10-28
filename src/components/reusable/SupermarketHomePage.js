import React, { useState,useEffect } from 'react'
import Nav from '../home/Nav'

import {useSelector,useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {loadAstore,fetchCategories} from '../../redux/actions'

import SubCategoryItemSlide from '../reusable/SubCategoryItemSlide'


const SupermarketHomePage =()=>{
    //global
    const _str_id = JSON.parse(localStorage.getItem("_str"))
    //redux state
    const dispatch = useDispatch()
    const {store,categories} = useSelector(state => state.StoreReducer)

    //component state
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)
    const [subCategories,setSubCategories] = useState([])

    //temp
    let storeP = []
    useEffect(() => {
      
        dispatch(loadAstore(_str_id))
        dispatch(fetchCategories())

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

    console.log(subCategories)
   
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
              subCategories.map((subCategory)=> <SubCategoryItemSlide subCategory={subCategory} storeProducts={storeP} /> )
            }   

            </> }
        
        </div>
    )
}

export default SupermarketHomePage
