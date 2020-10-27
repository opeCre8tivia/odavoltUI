import React, {useEffect} from "react"
import {useSelector} from 'react-redux'
import LoginComponent from "./LoginComponent"

const AuthComponent = () =>{
    //redux state

    const{showAuthComponentPopUp}= useSelector((state)=>state.AuthReducer)

    useEffect(() => {
        showOrHideAuthComponent()
        
    }, [showAuthComponentPopUp])

   const showOrHideAuthComponent=()=>{
        let authComponent = document.querySelector('.auth-component-main-wrapper')
        if(showAuthComponentPopUp === true){
            authComponent.style.display = "block";
        }
        else{
            authComponent.style.display = "none"; 
        }
    }

    return(
        <div className="auth-component-main-wrapper">
             <LoginComponent/>
        </div>
    )
}

export default AuthComponent;