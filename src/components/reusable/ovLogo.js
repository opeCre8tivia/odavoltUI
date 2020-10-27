import React from 'react'

import ovLogo from "../../assets/img/ov-icon-small.png"

const OvLogo = ()=>{

    return(
        <div style={styles.logoCont}>
            <img src={ovLogo} alt="odavolt-logo" style={styles.logoImage}/>
        </div>
    )
}

const styles = {
    logoCont:{
        width:'40px',
        height:'40px',
        margin:'auto',
    },
    logoImage:{
        width:'100%',
        height:'100%',
        margin:'auto',
    }
}

export default OvLogo;