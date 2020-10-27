import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

import Checkout from './Checkout'
import jwt_decode from 'jwt-decode'

const UserDash =()=> {
     //token
     const _token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
    //component level state
     const [isTrueToken , setTrueToken] = useState(null)

    //redux state
    const {user,isAuthenticated} = useSelector((state)=>state.AuthReducer)

    useEffect(()=>{
        if(_token !== null){
            validateToken(_token)
        }
        else{
            setTrueToken(false)
        }
    },[])

    function validateToken(tkn){
        const decoded = jwt_decode(tkn)
        if(decoded.user){
            setTrueToken(true)
        }
        else{
            setTrueToken(false)
        }
    }

    return (
        <div>
            {isTrueToken === false? <Redirect to="/login"></Redirect> : null}
                <Checkout/>
        </div>
    )
}

export default UserDash
