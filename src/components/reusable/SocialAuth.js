import React from 'react'
import LoginComponent from '../auth/LoginComponent'
import AuthComponent from '../auth/AuthComponent'

const SocialAuth = ({providerLogo, title}) =>{

    return(
        <div style={socialauthStyles.container}>
            <img src={providerLogo} alt="ov-auth" style={socialauthStyles.image}  />
            <div style={socialauthStyles.title}> {title}</div>
        </div>
    )
}

const socialauthStyles ={
        container:{
            width:'80%',
            height:'calc(1.5em + .75rem + 2px)',
            margin:'auto',
            marginTop:'15px',
            border:'1px solid #ced4da',
            borderRadius:'.25rem',
            position:'relative'

        },
        image:{
            width:'16px',
            height:'16px',
            position:'absolute',
            top:'50%',
            transform:'translateY(-50%)',
            left:'6px'
        },
        title:{
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)',
            color:'var(--ov-gray-medium)',
            fontSize:'calc(12px + 0.2vw)',
            textAlign:"center"
            
        }  
}

export default SocialAuth;