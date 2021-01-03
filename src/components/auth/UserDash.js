import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {LoadUser} from "../../redux/actions"

import Checkout from './Checkout'
import jwt_decode from 'jwt-decode'

const UserDash =(props)=> {
    
     //token
     const _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
   
     
    //component level state
     const [isTrueToken , setIsTrueToken] = useState(null)

    //redux state
    const dispatch = useDispatch()
    // const {user,isAuthenticated} = useSelector((state)=>state.AuthReducer)

    useEffect(()=>{
     
        dispatch(LoadUser(_token))
    },[])

    useEffect(()=>{
        if(_token === null){
            setIsTrueToken(false)
        }
    },[])

    useEffect(()=>{
        if(_token !== null){
            validateToken(_token)
        }
       
    },[_token])

    function validateToken(tkn){
        const decoded = jwt_decode(tkn)
        
        if(decoded.user){
            setIsTrueToken(true)
        }
        else{
            setIsTrueToken(false) 
        }
       
    }

   

    return (

        <div>
            {isTrueToken === false  ? <Redirect to="/login"></Redirect>  : null}
            {/* {isAuthenticated === false  ? <Redirect to="/login"></Redirect>  : null} */}

                <Checkout/>
        </div>
    )
}

export default UserDash
