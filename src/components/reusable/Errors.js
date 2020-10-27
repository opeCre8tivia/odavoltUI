import React from "react"

const Errors = ({error})=>{
    return(
        <div style={styles.container}> 
            <p style={styles.text}>
                {error}
            </p>
        </div>
    )
}

const styles = {
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F71C46', 
    },
    text:{
        color:'#fff',
        fontFamily:"Arial,San-serif",
        textAlign:'center',
        fontSize:'calc(1.2vh + 5px)'
    }
}

export default Errors;