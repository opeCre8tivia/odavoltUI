import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {fetchProducts,LoadUser} from '../../redux/actions'

import jwt_decode from 'jwt-decode'

import Nav  from "./Nav"
import OvSlider from './OvSlider'
import SupermarketList from './SupermarketList'
import ItemSlide from './ItemSlide'
import Cartfab from '../reusable/Cartfab'
import Cart from "../cart/Cart"
import AuthComponent from "../auth/AuthComponent"


const Home = ()=> {

     //token
     const _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
     //component level state
     
 
    
    const dispatch= useDispatch()
    const {user} = useSelector((state)=>state.AuthReducer)
   

    useEffect(()=>{
        dispatch(fetchProducts()) //this is a redux action
    },[])


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
            <SupermarketList/>

            <ItemSlide category="Groceries" />
            <ItemSlide category="Electronics"/>
            <Cartfab/>
            <Cart/>

            <AuthComponent/>
            
        </div>
    )
}

export default Home
