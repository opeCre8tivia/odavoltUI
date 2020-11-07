import React,{useState,useEffect} from 'react'

import {useSelector,useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {loadAstore,fetchCategories,loadParticularStoreProducts,fetchStores} from '../../redux/actions'

import SubCategoryItemSlide from '../reusable/SubCategoryItemSlide'

const  StorePopulatedSubCategories =() =>{

         
    //redux state
    const dispatch = useDispatch()
    const {store,categories,particularStoreProducts,storeList} = useSelector(state => state.StoreReducer)

    //component state
    const [_str_id, set_str_id] = useState("")
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)
    const [subCategories,setSubCategories] = useState([])
    const [populatedSubCategoryList,setPopulatedSubCategoryList] = useState([])


    useEffect(()=>{
        dispatch(fetchStores()) //this is a redux action
    },[])

    //etract main store's id
    useEffect(()=>{
        extractMainStore()
    },[storeList])
    
    //dispatch actions to fetch arespective store and caegories
    useEffect(() => {
        // dispatch(loadAstore(_str_id))
        dispatch(fetchCategories())
    }, [_str_id])
    

    //action that loads products that are specific to respective store
    useEffect(()=>{
        dispatch(loadParticularStoreProducts(_str_id))
    },[_str_id])



    useEffect(() => {
        filterPopulatedSubCategories() 
    }, [particularStoreProducts])



    useEffect(() => {
        sortSubCategories()
    }, [categories])

    //function to extract main function from all the stores
    function extractMainStore(){
        storeList.forEach(store => {
            if(store.name.toLowerCase() === 'odavolt'){
                set_str_id(store._id)
            }
        });
    }


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
