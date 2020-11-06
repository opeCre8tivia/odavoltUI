import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {loadAstore} from '../../redux/actions'

const SupermarketPreview =({item})=> {

    const dispatch = useDispatch()

    const [redirect,setRedirect] = useState(false)
    
    return (
         <>
         {redirect === true ? <Redirect to="/view/supermarket"  /> : null}
        <div className="supermarket" key={item._id} onClick={()=>{
            localStorage.setItem("_str", JSON.stringify(item._id))
            setRedirect(true)
        }} >
                <div className="name" >{item.name}</div>
            <p>SUPERMARKET</p>
            {/* <img src={item.logoUrl} /> */}
            <button className="btn btn-sm btn-outline btn-warning btn-supermarket " > SHOP NOW </button>
        </div>
        </>
    
    )
}



export default SupermarketPreview
