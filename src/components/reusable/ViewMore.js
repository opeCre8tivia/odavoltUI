import React, {useState} from 'react'
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

    

    

    //redux state
    const dispatch = useDispatch()
    const {productsBySubCategory} = useSelector((state)=>state.ProductReducer)
    
   

    //function to filter search products
    const filterPoducts=(suggestionText)=>{
        console.log('i am called...')
        if(productsBySubCategory === null){
            return null
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
   const handleSearch=(e)=>{
    console.log('i am called ccc...')
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
    console.log(filtered)
    setSearchedItemsArray(filtered)
    setIsSearch(true)
   }


    
    return (
        <div style={{position:"relative"}}>
        <Nav/>
        {/* <OvSlider/> */}
        <div className="view-more-slider-cont" >
            <img src={require("../../assets/img/viewmorecover.jpg")} alt="cover pix"  />
            <div className="container">
                <div className="row">
                    <div className=" col-lg-6 col-md-6 col-sm-10 col-xs-11 search-input-cont" >
                        {/* search */}
                        <input type="text" placeholder="Search Exactly What you need e.g Eggs" onChange={handleOnchange} />
                        
                        <div className="search-icon-cont">
                            <i className="fa fa-search" ></i>
                        </div>
                        
                    </div>
                    </div>
                </div>


                

        </div>

        <div className="col-lg-6 col-md-6 col-sm-10 col-xs-11 suggestion-wrapper" >
        <SearchSuggestions suggestionArray={suggestionArray} handleSearch={handleSearch}  /> 
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
        maxHeight:"250px",
        margin:"5px",
        boxShadow:"1px 1px 2px rgba(0,0,0,0.2)"
    }
}

export default ViewMore
