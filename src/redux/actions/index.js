import axios from 'axios';
import {rootapi} from '../../rootapi'

import {getProductsByCategory, fetchProducts} from './productsActions'
import {RegisterUserAction,LoadUser,LoginUserAction} from './userActions'



//store actions
export const fetchStores =()=>{
    return async function(dispatch){

        try {
            console.log('fetc...called')
        //    const res = await axios.get(`${rootapi}/api/store-crud`)
           const res = await axios.get(`http://localhost:5000/api/store-crud`)
           console.log(res.data)
            if(res.data.payload){
                dispatch({
                    type:'FETCH_STORES',
                    payload:res.data.payload
                })
            }   
            
        } catch (error) {
            console.log(error)
        }
        
       
    }
}


export const loadAstore =(id)=>{
    return async function(dispatch){

        try {
            console.log('load...called')
        //    const res = await axios.get(`${rootapi}/api/store-crud`)
           const res = await axios.get(`http://localhost:5000/api/store-crud/${id} `)
           console.log(res.data)
            if(res.data.payload){
                dispatch({
                    type:'LOAD_ASTORE',
                    payload:res.data.payload
                })
            }   
            
        } catch (error) {
            console.log(error)
        }
        
       
    }
}



export const fetchCategories =()=>{
    return async function(dispatch){

        try {
        
        //    const res = await axios.get(`${rootapi}/api/categories-crud`)
           const res = await axios.get(`http://localhost:5000/api/categories-crud`)
            if(res.data.payload){
                dispatch({
                    type:'FETCH_CATEGORIES',
                    payload:res.data.payload
                })
            }   
            
        } catch (error) {
            console.log(error)
        }
        
       
    }
}




// cart actions
export const ShowCart= () =>{
    return function (dispatch) {
        dispatch({
            type:'SHOW_CART'

        })
    }
}

export const HideCart = ()=>{
    return function(dispatch){
        dispatch({
            type:'HIDE_CART'
        })
    }
}

export const cartChange =()=>{
    return function(dispatch){
        dispatch({
            type:'CART_CHANGE'
        })
    }
}

export const cartNormalise =()=>{
    return function(dispatch){
        dispatch({
            type:'CART_NORMALISE'
        })
    }
}



//registering a user
export {RegisterUserAction}


//loading a user
export {LoadUser}

//login user
export {LoginUserAction}

export {fetchProducts}

export {getProductsByCategory}



export const setAlert = (msg, type) =>{
    return function(dispatch){
        const id = Math.random();
        dispatch({
            type:'SET_ALERT',
            payload:{msg,type, id}

        })

        setTimeout(()=>dispatch({type:'REMOVE_ALERT', payload:{id}}),5000);
    }
}

//login and signup button actions

export const loginButtonClicked =()=>{
    return  function(dispatch){
        console.log("login.....")
        dispatch({
            type:"LOGIN_BTN"
        })
    }
}


