import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'


const SupermarketPreview =({item})=> {

    const dispatch = useDispatch()

    // const [redirect,setRedirect] = useState(false)
    
    return (
         <>
         {/* {redirect === true ? <Redirect to="/view/supermarket"  /> : null} */}
      <Link to={{pathname:`/view/supermarket/${item._id}`, state:`${item._id}`}} >
            <div className="supermarket" key={item._id} onClick={()=>{
                localStorage.setItem("_str", JSON.stringify(item._id))
                dispatch({type:"CLEAR_PARTICULAR_STORE_ITEMS"})
                
            }} >
                    <div className="name" >{item.name}</div>
                <p>SUPERMARKET</p>
                {/* <img src={item.logoUrl} /> */}
                <button className="btn btn-sm btn-outline btn-warning btn-supermarket " > SHOP NOW </button>
            </div>
        </Link>  
        </>
    
    )
}



export default SupermarketPreview
