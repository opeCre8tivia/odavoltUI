//this is implemented using react-multi-carousel
import React, { useState }  from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../assets/css/aliceCarouselCustom.css';

import Product from '../home/Product';


const Ovcarousel =({productList})=>{
  
    const [autoplay,setAutoPlay] = useState(true)
 
    const responsive = {
      0: { items: 2 },
      350:{items:2},
      568:{ items: 4},
      1024:{ items: 5},
  };
 //function to manage autoplay prop
 function manageAutoPlay(e){
    setAutoPlay(false)
}

 //elements to be passed as items in d item prop 
   const items = productList.map((item)=>(
    <Product item={item}  key={item._id} manageAutoPlay ={manageAutoPlay} />
))



let bool;
let boolArrow
let w = window.innerWidth
if(w < 568){
    bool = true
    boolArrow = false
}
else{
    bool = false
    boolArrow = true
}



    return(


      <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      autoPlay={autoplay}
      paddingLeft={0}
      autoHeight={true}
      autoWidth={true}
      disableButtonsControls={boolArrow}
      disableDotsControl={true}
      autoPlayStrategy="action"
      autoPlayInterval={3000}
      animationDuration={4000}
      infinite={false}
      
      
  />

    )
}

export default Ovcarousel;


