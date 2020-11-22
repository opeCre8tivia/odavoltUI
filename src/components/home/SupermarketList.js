import React from 'react'

import SupermarketDisplayCarousel from '../reusable/SupermarketDisplayCarousel'

const SupermarketList =()=> {

    console.log('list loadede...')
    return (
        <div className="supermarketlist-cont">
            
           <SupermarketDisplayCarousel />
        </div>
    )
}
export default SupermarketList
