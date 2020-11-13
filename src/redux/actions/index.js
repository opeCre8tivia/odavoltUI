import axios from 'axios';
import {rootapi} from '../../rootapi'

import {getProductsBySubCategory, fetchProducts} from './productsActions'
import {RegisterUserAction,LoadUser,LoginUserAction} from './userActions'



//store actions
export const fetchStores =()=>{
    return async function(dispatch){
        try {
           const res = await axios.get(`${rootapi}/api/store-crud`)
            dispatch({
              type: 'LOADING'
            })
            if(res.data.payload){
                dispatch({
                    type:'FETCH_STORES',
                    payload:res.data.payload
                })
                dispatch({
                  type: 'NOT_LOADING'
                })
                dispatch({
                  type: 'NETWORK_ON'
                })
            }
            
        } catch (error) {
            if(error.message === 'Network Error'){
              dispatch({
                type: 'LOADING'
              })
              dispatch({
                type: 'NETWORK_OFF'
              })
            }
        }
        
       
    }
}


export const loadAstore =(id)=>{
    return async function(dispatch){

        try {
           
           const res = await axios.get(`${rootapi}/api/store-crud/${id}`)
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

export const loadParticularStoreProducts =(id)=>{
    return async function(dispatch){
        try {
            let idlen = id.length
            if(idlen < 23){
                return null
            }
           const res = await axios.get(`${rootapi}/api/storeitem-crud/particular/${id}`)
            if(res.data.payload){
                dispatch({
                    type:'LOAD_PARTICULAR_STORE_PRODUCTS',
                    payload:res.data.payload
                })
            }   
            
        } catch (err) {
            console.log(err.message)
        }  
    }
    }




export const fetchCategories =()=>{
    return async function(dispatch){

        try {
        
           const res = await axios.get(`${rootapi}/api/categories-crud`)
        
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

export {getProductsBySubCategory}



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
        dispatch({
            type:"LOGIN_BTN"
        })
    }
}

