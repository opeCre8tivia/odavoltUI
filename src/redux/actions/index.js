import axios from 'axios';
import {productList} from '../../productList'

import getProductsByCategory from './productsActions'
import {RegisterUserAction,LoadUser,LoginUserAction} from './userActions'

//product actions
export const fetchProducts =()=>{
    return function(dispatch){
        //fetch items
        // const products = 
        console.log("products fetched")
        dispatch({
            type:'FETCH_PRODUCTS',
            payload:productList
        })
    }
}


//store actions
export const fetchStores =()=>{
    return async function(dispatch){

        try {

           const res = await axios.get('http://localhost:5000/api/store-crud')
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





//product actions

export {getProductsByCategory}

