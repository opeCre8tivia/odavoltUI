import React,{useState,useEffect} from 'react'

import {useSelector,useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {loadAstore,fetchCategories,loadParticularStoreProducts} from '../../redux/actions'

import SubCategoryItemSlide from '../reusable/SubCategoryItemSlide'

const  StorePopulatedSubCategories =() =>{

         
    //redux state
    const dispatch = useDispatch()
    const {store,categories,particularStoreProducts} = useSelector(state => state.StoreReducer)

    //component state
    const [_str_id, set_str_id] = useState("")
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)
    const [subCategories,setSubCategories] = useState([])
    const [populatedSubCategoryList,setPopulatedSubCategoryList] = useState([])
    const [loadedStore, setLoadedStore] = useState({})

    //get the store id from local storage an set it  to state
    //action done only when user reloads
    useEffect(()=>{
        const str_id = JSON.parse(localStorage.getItem("_main"))
        set_str_id(str_id)
    },[])
    
    //load the appropriate store
    useEffect(() => {
        dispatch(loadAstore(_str_id))
        dispatch(fetchCategories())
    }, [_str_id])
    

    //load products that are specific to respective store
    useEffect(()=>{
        dispatch(loadParticularStoreProducts(_str_id))
    },[_str_id,loadedStore])


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
        <div>
            {/* products by sub category */}
            {/* display only populated sub categories */}
            {
             populatedSubCategoryList.map((subCategory)=> <SubCategoryItemSlide subCategory={subCategory} storeProducts={particularStoreProducts} key={subCategory} /> )
            } 
            
        </div>
    )
}

export default StorePopulatedSubCategories
