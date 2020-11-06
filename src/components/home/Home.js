import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {fetchProducts,LoadUser,fetchStores} from '../../redux/actions'

import jwt_decode from 'jwt-decode'

import Nav  from "./Nav"
import OvSlider from './OvSlider'
import SupermarketList from './SupermarketList'
import StorePopulatedSubCategories from '../reusable/StorePopulatedSubCategories'



const Home = ()=> {

     //token
     const _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
     //component level state
     
 
    
    const dispatch= useDispatch()
    const {user} = useSelector((state)=>state.AuthReducer)
    const { storeList} = useSelector((state)=>state.StoreReducer)
   

    useEffect(()=>{
        dispatch(fetchStores()) //this is a redux action
    },[])

    //validate user token
    useEffect(()=>{
        if(_token !== null){
            validateToken(_token)
        }
        
    },[])
    //etract and persist main storez id
    useEffect(()=>{
        extractMainStore()
    },[storeList])


    function validateToken(tkn){
        const decoded = jwt_decode(tkn)
        if(decoded.user  && user === null){
            dispatch(LoadUser(_token)) //this is a redux action
        }
    }

    function extractMainStore(){
        storeList.forEach(store => {
            if(store.name.toLowerCase() === 'odavolt'){
                localStorage.setItem("_main", JSON.stringify(store._id))
            }
        });
    }





    return (
        <div className="home-main-cont" >
            <Nav/>
            <OvSlider/>
            <SupermarketList/>
            <StorePopulatedSubCategories/>

            {/* <ItemSlide category="Groceries" />
            <ItemSlide category="Electronics"/> */}
           
            
        </div>
    )
}

export default Home
