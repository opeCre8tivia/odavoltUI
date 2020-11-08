import React, { useState,useEffect } from 'react'
import Nav from '../home/Nav'

import {useSelector,useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {loadAstore,fetchCategories,loadParticularStoreProducts} from '../../redux/actions'

import SubCategoryItemSlide from '../reusable/SubCategoryItemSlide'


const SupermarketHomePage =()=>{
  
    
    //redux state
    const dispatch = useDispatch()
    const {store,categories,particularStoreProducts} = useSelector(state => state.StoreReducer)

    //component state
    // const [_str_id, set_str_id] = useState("")
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)
    const [subCategories,setSubCategories] = useState([])
    const [populatedSubCategoryList,setPopulatedSubCategoryList] = useState([])
    const [loadedStore, setLoadedStore] = useState({})

    //get the store id from local storage
    const _str_id = JSON.parse(localStorage.getItem("_str"))

  
   
    //load the appropriate store
    useEffect(() => {
        dispatch(loadAstore(_str_id))
        dispatch(fetchCategories())
    }, [_str_id])
    

    //load products that are specific to respective store
    useEffect(()=>{
        console.log('load particular products called...')
        console.log(_str_id)
       if(_str_id){
        console.log(_str_id)
            dispatch(loadParticularStoreProducts(_str_id))
       }
    },[])


    //watches store and sets it to component store
    useEffect(() => {
        if(store !== null){
            setLoading(false)
            setLoadedStore(store)    
        }
        else{
            setLoading(true)  
        }
       
    }, [store])


    useEffect(() => {
        filterPopulatedSubCategories() 
    }, [particularStoreProducts,loadedStore,loading])



    useEffect(() => {
        sortSubCategories()

    }, [categories,loadedStore])

    //creates an array of subCategories from a category
    const sortSubCategories =()=>{
        categories.forEach((category)=>{
            
            if(category.name === "Groceries"){
                setSubCategories(category.subCategories)
            }
        })
    }


    // enables theshowing of only those sub categories that have items to be shown
    function filterPopulatedSubCategories(){
        //generate all the subcategories the store products belong to
        let storeProductSubCat = []
        let populatedSubCats = []
        particularStoreProducts.forEach((e)=>{
            storeProductSubCat.push(e.product.subCategory)
        })

        //to display onlysubcategories that have products we compare
        subCategories.forEach((i)=>{
            if(storeProductSubCat.includes(i)){
                populatedSubCats.push(i)
            }
        })

        setPopulatedSubCategoryList(populatedSubCats)
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
                        {loadedStore !== null ? loadedStore.name : 'SUPERMARKET'}
                    </div>
                </div>       

            </div>

            {/* products by sub category */}
            {/* display only populated sub categories */}

            {
             populatedSubCategoryList.map((subCategory)=> <SubCategoryItemSlide subCategory={subCategory} storeProducts={particularStoreProducts} key={subCategory} /> )
            }   

            </> }
        
        </div>
    )
}

export default SupermarketHomePage
