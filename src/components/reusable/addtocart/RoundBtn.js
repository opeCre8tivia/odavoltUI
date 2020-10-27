//This is a reusable custom component... its styled using js

import React from 'react';
//import {useDispatch} from 'react-redux';

const RoundBtn = ({item,value,showMinusBtn,addToCart,decreament}) =>{
       

    return(
        <>
     
        
            <div style={styles.roundbtn} onClick={(e)=>{
                
                if(e.target.innerText ==="+"){
                    addToCart(item)
                }
                //for the btn with minus sign
               
                if(e.target.innerText === "-"){
                   
                    decreament(item)
                }  
            }}>
                <p id="child" style={styles.text} >{value} </p>
            </div>
    

        </>
    )
}

const styles = {
    roundbtn:{
        width:"20px",
        height:"20px",
        border:"1px solid #ffffff",
        borderRadius:"10px",
        backgroundColor:"#fff",
        cursor: "pointer",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    text:{
        color:"var(--ov-primary)",
	    fontFamily: "Arial, Helvetica, sans-serif",
	    fontWeight:"bold",
        fontSize: "100%",
        margin:0,
        textAlign:"center"
    }
}

export  default RoundBtn;