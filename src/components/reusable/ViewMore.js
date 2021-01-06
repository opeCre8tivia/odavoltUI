import React, {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getProductsBySubCategory} from '../../redux/actions'
import SearchSuggestions from './SearchSuggestions'


import Nav from '../home/Nav'

import Product from '../home/Product'
import ProductPlaceholderLoader from './ProductPlaceholderLoader'

const ViewMore =(props)=> {

    //component state
    const [suggestionText,setSuggestionText] = useState('')
    const [subCategoryItems, setSubCategoryItems] = useState([])
    const [suggestionArray, setSuggestionArray] = useState([])
    const [searchedItemsArray,setSearchedItemsArray] = useState([])
    const [isSearch,setIsSearch] = useState(false)
    const [__loading,set__loading] = useState(false)

    

    //redux state
    const dispatch = useDispatch()
    const {productsBySubCategory} = useSelector((state)=>state.ProductReducer)

    // console.log(props)
    // console.log(props.location.state)

    localStorage.setItem('_vm01px', JSON.stringify(props.location.state))

    if(props.location.subCat !== undefined){
        localStorage.setItem('_vm02px', JSON.stringify(props.location.subCat))
    }
    
   //
   useEffect(() => {
      
        let storeId = JSON.parse(localStorage.getItem('_vm01px'))
            console.log(props.match.params.id)
            dispatch(getProductsBySubCategory(props.match.params.id))
      
      
      //eslint-disable-next-line
   }, [])


   useEffect(()=>{
    let _subCategory = JSON.parse(localStorage.getItem('_vm02px'))
    //filter items of this sub category
    let _subCatItems = productsBySubCategory.filter((i)=>i.product.subCategory === _subCategory)
    console.log('===== sub cat items ======')
    console.log(_subCatItems)
    setSubCategoryItems(_subCatItems)
   },[productsBySubCategory])

    //function to filter search products
    const filterPoducts=(suggestionText)=>{
        
        if(productsBySubCategory === null){
            return null
        }
        if(suggestionText.length === 0){
            console.log("len 0")
            setSuggestionArray([])
            return null //stop further execution
        } 
       const filtered = productsBySubCategory.filter(item=>{
            if(item.product.name.toLowerCase().includes(suggestionText.toLowerCase())){
                
                return item
            }
         
        })
         setSuggestionArray(filtered)
  
    }

    
   const handleOnchange=(e)=>{
        setSuggestionText(e.target.value)
        filterPoducts(e.target.value)

    }


    //handle search
   const handleSearch=(e)=>{
    let _text = e.target.innerText
    console.log(_text)

    if(productsBySubCategory === null){
        return null
    } 
    
   const filtered = productsBySubCategory.filter(item=>{
        if(item.product.name.toLowerCase().includes(_text.toLowerCase())){
            
            return item
        }
      
    })

        let displayArray = []

        //push the filtered item 
        filtered.forEach(element => {
            displayArray.push(element)
        });

        //add more related items to the array (end of array)

        suggestionArray.forEach(i =>{
            displayArray.push(i)
        })

        
        setSearchedItemsArray(displayArray)
        setIsSearch(true)
        setSuggestionArray([])
   
   }


   useEffect(()=>{
    if(productsBySubCategory.length > 0){
        set__loading(false)
    }
    else{
        set__loading(true)
    }
 },[productsBySubCategory])


    
    return (
        <div style={{position:"relative"}}>
        <Nav/>
        <div style={{position:"relative"}}>
        <div className="view-more-slider-cont" >
            <img src={require("../../assets/img/viewmorecover.jpg")} alt="cover pix"  />
        </div>

        <div className="search_suggestions_cont">

        
                    <div className=" col-lg-4 col-md-4 col-sm-10 col-xs-11 search-input-cont" >
                        {/* search */}
                        <input type="text" placeholder="Search Exactly What you need e.g Eggs" onChange={handleOnchange} />
                        
                        <div className="search-icon-cont">
                            <i className="fa fa-search" ></i>
                        </div>
                        
                    </div>
                  

        <div className="col-lg-4 col-md-4 col-sm-10 col-xs-11 suggestion-wrapper" >
        <SearchSuggestions suggestionArray={suggestionArray} handleSearch={handleSearch}  /> 
        </div>
        </div>


       {__loading === false ? <> {
            isSearch === false ? <div style={styles.mainContainer}>
            {productsBySubCategory && <p>  </p>}
            <div className="row row-reset-search" style={{minHeight:'50vh',minWidth:"340px",maxWidth:"99.5vw"}}>
                {productsBySubCategory && subCategoryItems.map((item)=> <div style={styles.productWrapper} key={item._id}><Product item={item}  /></div>)}
            </div>
          
            </div> :

            <div style={styles.mainContainer}>
            <div className="row row-reset-search" style={{minHeight:'50vh',minWidth:"340px",maxWidth:"99.5vw"}}>
                    {searchedItemsArray && searchedItemsArray.map((item)=> <div style={styles.productWrapper} key={Math.random()}><Product item={item}  /></div>)}
                </div>
            </div>
            
        }</>:
        <ProductPlaceholderLoader/>
        }

       
        </div>
            
        </div>
    )
}

const styles ={
    mainContainer:{
        backgroundColor:"#fff",
        marginTop:'20px',
        width:'100%',
        height:"auto"
    },
    productWrapper:{
        maxHeight:"auto",
        margin:"5px"
    }
}

export default ViewMore
