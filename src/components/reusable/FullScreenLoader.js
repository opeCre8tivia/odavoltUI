import React from 'react' 
const FullScreenLoader = ()=>{
return (
        <div className=" fullscreen-loader-cont" >
             <div className="loader-inner-wrapper">
                    <img src={require("../../assets/img/loader.svg") } alt="loader"/>
            </div>
        </div>
       )
}
export default FullScreenLoader