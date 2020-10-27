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

    return (
        <div className="ov-slider-container">
            <div  className="row" style={{justifyContent:"between",width:'95vw',margin:'auto',padding:'1px'}}>
                <div className="col-lg-8 col-md-8 col-sm-11 col-xs-11 ov-slider" style={{width:'100%'}}>
                     <Slider {...settings}>
                        <div className="slider-image-cont">   
                            <img src={require("../../assets/img/slide1.jpg")} alt="slider" className="slider-image" />
                        </div>

                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div>
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