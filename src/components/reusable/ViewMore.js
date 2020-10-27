import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getProductsByCategory} from '../../redux/actions'


import Nav from '../home/Nav'
import OvSlider from '../home/OvSlider'
import Product from '../home/Product'
import Cartfab from './Cartfab'
import Cart from '../cart/Cart'

const ViewMore =(props)=> {

    //redux state
    const dispatch = useDispatch()
    const {productsByCategory} = useSelector((state)=>state.ProductReducer)
    
    

    useEffect(() => {
      dispatch(getProductsByCategory())  
      
    }, [])
    return (
        <>
        <Nav/>
        <OvSlider/>

        <div style={styles.mainContainer}>
            {productsByCategory && <p>  </p>}
            <div className="row " style={{minHeight:'50vh',minWidth:"100vw", paddingLeft:"20px",paddingRight:"20px",backgroundColor:"pink"}}>
                {productsByCategory && productsByCategory.map((item)=> <div style={styles.productWrapper}><Product item={item}/></div>)}
            </div>
           <Cartfab/>
           <Cart/>
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
        backgroundColor:'yellow',
        boxShadow:"1px 1px 2px rgba(0,0,0,0.2)"
    }
}

export default ViewMore
