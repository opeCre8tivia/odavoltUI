import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {LoadUser} from '../../redux/actions'

import jwt_decode from 'jwt-decode'

import Nav  from "./Nav"
import OvSlider from './OvSlider'
import SupermarketList from './SupermarketList'
import StorePopulatedSubCategories from '../reusable/StorePopulatedSubCategories'
import FullScreenLoader from '../reusable/FullScreenLoader'
import ProductPlaceholderLoader from '../reusable/ProductPlaceholderLoader'



const Home = ()=> {

     //token
     const _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
     //component level state
    
    const dispatch= useDispatch()
    const {user} = useSelector((state)=>state.AuthReducer)
    const {loading} = useSelector((state)=>state.LoadingReducer)
    const {storeLoading} = useSelector((state)=>state.StoreReducer)

    //validate user token
    useEffect(()=>{
        if(_token !== null){
            validateToken(_token)
        }
        
    },[])


    function validateToken(tkn){
        const decoded = jwt_decode(tkn)
        if(decoded.user  && user === null){
            dispatch(LoadUser(_token)) //this is a redux action
        }
    }

    return (
      
     
             <div className="home-main-cont" >
                                    <Nav/>
                                    <OvSlider/>
                                    {
                                        storeLoading === false ? <>
                                         <SupermarketList/>
                                        <StorePopulatedSubCategories/>
                                        </> :
                                        <ProductPlaceholderLoader />
                                    }
              </div>
            ) 
}

export default Home
