import React, {useEffect} from "react";
import {useSelector} from "react-redux";

const OrderSuccess = (props) =>{
    //redux state
    const clientDashState = useSelector(state => state.ClientDashReducer)
    const {orderSubmitted} = clientDashState;

    useEffect(()=>{
        if(orderSubmitted === true){
            setTimeout( ()=>{
                animate();
            } , 2000);
            
            console.log('called');
        }
      
    },[orderSubmitted]);



function  animate(){
    //animate thank you btn

    let  btn  = document.querySelector('.thankbtn');

    if(btn === null){
        return null
    }

    btn.style.top = '20%';
    btn.style.opacity = '1';

  

    //animate paragraph plus
    let para = document.querySelector('.msg');
    let check = document.querySelector('.check-icon-cont');
    if(para=== null){
        return null
    }
    if(check=== null){
        return null
    }

    setTimeout(()=>{
        check.style.opacity = '1';
    },200);

    setTimeout(()=>{
        para.style.bottom = '20%';
    para.style.opacity = '1';
    
    },500)


}

   

    return(
        <div  className='container-fluid'>
        

           
            <div className="  col-lg-12 col-md-12 col-sm-12 ov-order-success-cont" >
                <div className="ov-order-success-inner-wrapper">

               
                <div className="col-lg-6 col-md-6 col-sm-12 wrapper-inner-cont" >

                <button className="thankbtn">THANK YOU FOR SHOPPING WITH US</button>

                <div className="green-spinner"> 
                    <div className="check-icon-cont"><span> <i className="fas fa-check"></i></span></div>
                
                 </div>
                    <p className="msg">Your Order has been Recieved  </p>
                </div>
                

                <div className="ov-order-success-close" onClick={props.closeOrderSuccess}><p className="mt-1">x</p></div>
                </div>
            </div>
        </div>
      
    )
}

export default OrderSuccess;