import React from 'react'

const SupermarketPreview =({item})=> {
    
    return (
        <div className="supermarket" key={item._id}  >
                <div className="name" >{item.name}</div>
            <p>SUPERMARKET</p>
            <img src={item.logoUrl} />
            <button className="btn btn-sm btn-outline btn-warning btn-supermarket " > SHOP NOW </button>
        </div>
    )
}



export default SupermarketPreview
