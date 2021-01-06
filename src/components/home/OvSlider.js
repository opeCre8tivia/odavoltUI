import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const OvSlider =(props)=> {

    const settings = {
        dots: true,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide:true,
      };

      const pix = [
          {url:"/slide1.jpg",id:1},
          {url:"/slide2.jpg",id:2},
          {url:"/slide3.png",id:3},
          {url:"/slide4.png",id:4}
      ]

    return (
        <div className="ov-slider-container">
            <div  className="row" style={{justifyContent:"between",width:'95vw',margin:'auto',padding:'1px'}}>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ov-slider" style={{width:'100%'}}>
                     <Slider {...settings}>
                       { pix.map(slide=>(
                           <div className="slider-image-cont" key={slide.id}>   
                                <img src={require(`../../assets/img${slide.url}`)} alt="slider" className="slider-image" />
                           </div>
                       )) }
                        </Slider> 
                </div>
                <div className="col-lg-3 col-md-3 col-sm-11 col-xs-11 ov-top-ad-cont">
                   <div className="ov-top-ad-one" >
                       <img src={require("../../assets/img/add1.jpg")} alt="advert" className="ad-image"/>
                       <div className="playstore-link" > 
                           <img src={require("../../assets/img/playstore.png")} alt="playstore logo" className="playstore-image"/>
                       </div>
                   </div>
                   <div className="ov-top-ad-two">ad2</div>     
                </div>

            </div>
        </div>
    )
}

export default OvSlider