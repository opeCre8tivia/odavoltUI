import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getProductsBySubCategory} from '../../redux/actions'


import Nav from '../home/Nav'
import OvSlider from '../home/OvSlider'
import Product from '../home/Product'

const ViewMore =(props)=> {

    //redux state
    const dispatch = useDispatch()
    const {productsBySubCategory} = useSelector((state)=>state.ProductReducer)
    
    

    // useEffect(() => {
    //   dispatch(getProductsBySubCategory())  
      
    // }, [])
    return (
        <>
        <Nav/>
        {/* <OvSlider/> */}
        <div className="view-more-slider-cont" >
            <img src={require("../../assets/img/viewmorecover.jpg")} alt="cover pix"  />

            <div className="row">
            <div className=" col-lg-6 col-md-6 col-sm-11 search-input-cont" >
                <input type="text" placeholder="Search Exactly What you need e.g Eggs" />
                <div className="search-icon-cont">

                </div>
            </div>
            </div>
        </div>

        <div style={styles.mainContainer}>
            {productsBySubCategory && <p>  </p>}
            <div className="row " style={{minHeight:'50vh',minWidth:"100vw", paddingLeft:"20px",paddingRight:"20px"}}>
                {productsBySubCategory && productsBySubCategory.map((item)=> <div style={styles.productWrapper} key={item.storeId}><Product item={item}  /></div>)}
            </div>
          
        </div>
            
        </>
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
