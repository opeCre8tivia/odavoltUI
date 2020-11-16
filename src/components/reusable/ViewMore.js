import React, {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getProductsBySubCategory} from '../../redux/actions'
import SearchSuggestions from './SearchSuggestions'


import Nav from '../home/Nav'
import OvSlider from '../home/OvSlider'
import Product from '../home/Product'

const ViewMore =(props)=> {

    //component state
    const [suggestionText,setSuggestionText] = useState('')
    const [suggestionArray, setSuggestionArray] = useState([])
    const [searchedItemsArray,setSearchedItemsArray] = useState([])
    const [isSearch,setIsSearch] = useState(false)

    let _subCategory;

    

    //redux state
    const dispatch = useDispatch()
    const {productsBySubCategory} = useSelector((state)=>state.ProductReducer)
    
   //
   useEffect(() => {
      dispatch(getProductsBySubCategory(_subCategory,props.location.state))
   }, [])

    //function to filter search products
    const filterPoducts=(suggestionText)=>{
        console.log(suggestionText)
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
            console.log(filtered)
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
    
   
        setSearchedItemsArray(filtered)
        setIsSearch(true)
        setSuggestionArray([])
   
   }


    
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


        {
            isSearch === false ? <div style={styles.mainContainer}>
            {productsBySubCategory && <p>  </p>}
            <div className="row " style={{minHeight:'50vh',minWidth:"100vw", paddingLeft:"20px",paddingRight:"20px"}}>
                {productsBySubCategory && productsBySubCategory.map((item)=> <div style={styles.productWrapper} key={item._id}><Product item={item}  /></div>)}
            </div>
          
            </div> :

            <div style={styles.mainContainer}>
            <div className="row " style={{minHeight:'50vh',minWidth:"100vw", paddingLeft:"20px",paddingRight:"20px"}}>
                    {searchedItemsArray && searchedItemsArray.map((item)=> <div style={styles.productWrapper} key={item._id}><Product item={item}  /></div>)}
                </div>
            </div>
            
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
