import React, { Fragment, useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import OrderSuccess from './OrderSuccess';
import {placeOrder}  from '../../redux/actions'

//import io from 'socket.io-client';




const ClientDash = (props) =>{

    //socket.io
    //const socket = io("http://localhost:5000");

    //redux state 
    const {orderSubmitted} = useSelector(state => state.ClientDashReducer)
    

    const dispatch =useDispatch()
    const{isAuthenticated,user} = useSelector(state => state.AuthReducer);
    
   
   

    //component state
    const [dashState, setDashState] = useState({
        productList:[],
        total:0,
        deliveryFee:2000
    })
    const {productList,total,deliveryFee} = dashState;

    const [formState, setFormState] = useState({
        district:'Soroti',
        surbab:"",
        popularPoint:"",
        gateDescription:"",
        paymentMethod:"cash on delivery"
    })

    const {district, surbab,popularPoint,gateDescription,paymentMethod} = formState;
   


    //effect to get products on every render
    useEffect(()=>{
    getProducts()
     //eslint-disable-next-line
    },[]);

    //use effect for showing notification
    useEffect(()=>{
        if(orderSubmitted === true){
            showOrderSuccess()
        }
        //eslint-disable-next-line
    },[orderSubmitted])



//Here is where the users name gets splited so that we only display one, hopefully the christian one


// const nameSplitter =(noun)=>{
 
//   let nounArray = noun.split(" ");
//   //check if the returned array has length greater than  one
//   return nounArray.length > 1 ? nounArray[1] : nounArray[0]
// }





      //load items to checkout
       function getProducts(){
      
        let authToken = JSON.parse(localStorage.getItem('ov_TKN_aUTh'));
        
        if(authToken ){
            const products =JSON.parse(localStorage.getItem('ov-client-orders'));
            if(products === null){
                
                setDashState({
                    ...dashState,
                    productList:[],
            
                })
                return null}

              //get their total for every fetch
              let  totalUnitPrice = products.reduce((total,item)=>{
                return  total+ parseInt(item.unitPrice);
            },0)
            setDashState({
                ...dashState,
                productList:products,
                total:totalUnitPrice
            })
        }
}

   


   function handleOnChange(e){
       setFormState({
           ...formState,
           [e.target.name]:e.target.value
       })
   }

      
        //FUNCTION TO PLACE THE ORDER

        async function  PlaceNewOrder(e){
            e.preventDefault(); 
           const {firstName,lastName, mobile} = user.payload;
           const  orderDetails = productList;
            //creating an order object
           const orderData = {
            firstName,
            lastName,
            mobile,
            orderDetails,
            district,
            surbab,
            popularPoint,
            gateDescription,
            paymentMethod
        }
           //dispatching it in an action
            dispatch(placeOrder(orderData))
        
        }

    //show notification when checkout is successfull
    function showOrderSuccess(){
        let container  = document.querySelector('.order-success');
        container.style.display ='block';

        setTimeout(()=>{
            //reset redux state
            dispatch({type:'NOTIFICATION_SEEN'})
        },4000)
    }

    function closeOrderSuccess(){
        let container  = document.querySelector('.order-success');
        container.style.display ='none';
        window.location.reload();

    }

    function showLocationTab(){
        let locationtab  = document.querySelector('.ov-checkout-location-cont');
        let confirmOrdertab = document.querySelector('.ov-checkout-confirm');

        locationtab.style.display = "block";
        locationtab.style.opacity = '1';

        confirmOrdertab.style.display = 'none';
    }



    return(
        <div className="main-cont">
          
            <div className="order-success" style={{display:'none'}}>  <OrderSuccess closeOrderSuccess={closeOrderSuccess} />  </div>
             {
                 isAuthenticated === true ?<Fragment>
                      <div className="ov-checkout-top-section">
                       

                      <Link to="/">  <div  className="ov-checkout-logo-cont">
                             <img src={require("../../assets/img/ov-letter-logo.svg")} alt="logo" /> 
                             <div className="ov-checkout-logo-text">SHOP NOW</div>
                            
                        
                        </div></Link>
                        
                         <div className="ov-profile-section-wrapper">  
                            <div  className="ov-checkout-profile-image-cont"> 
                                    <img src={user !==null ? require('../../assets/img/user-icon.png') : require('../../assets/img/user-icon.png')} alt="profilepix" className="ov-checkout-profile-image"  /> 
                            </div> 
                            <div  className="ov-checkout-welcome-text"> Hi  {user !==null ? <span> {user.name} </span>: ""} </div>
                        </div>
                    </div>

                    <div className="row" style={{position:'relative',margin:'auto'}}>

                            <div className="small-menu-bars">
                                <span> <i className="fas fa-align-justify"></i></span>
                            </div>

                        <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10  ov-checkout-confirm">
                            <div className="checkout-scroll-cont">
                            {  
                               productList.length !== 0 ? 
                                     
                                        productList.map(item => 
                                            
                                        <div className="checkout-cart-item-cont" key={item._id}>
                                        <div className="cart-img-cont"><img src={item.product.imageUrls[0]} className="img-fluid img-round"   alt="cart-pix"/></div>
                                        <div className="item-details-cont"><p> {item.product.name}  </p> <p style={{textAlign:"center"}}> {item.unitPrice} </p></div>
                                    
                                        </div> ) 
                                         :
                            
                            <div className="ov-checkout-msg-cont">
                                <div className="ov-centered-wrapper">
                                 YOUR CART IS EMPTY
                                 <Link to="/"> <button  >GO SHOPPING</button></Link>
                                  
                                  
                                </div>
                             </div>
                            
                            }
                            </div>

                    <div className="ov-checkout-summary-cont">
                    {productList.length !==0 ? <Fragment>
                                                <ul>

                            <li><div className="ov-cart-span">Sub-total: </div>{total} </li>
                            <li><div className="ov-cart-span">Tax:</div>0.00</li>
                            <li><div className="ov-cart-span">Delivery Fee:</div> {deliveryFee} </li>
                            <li><div className="ov-cart-span">TOTAL: </div> {total + deliveryFee} </li>
                        </ul>
                         <button type="button"  className="ov-checkout-next-btn" onClick={showLocationTab}  >NEXT</button> </Fragment> :
                       <Link to="/" > <button type="button"  className="ov-checkout-next-btn"  >  SHOP</button></Link>
                }
                    </div>

                      

                </div>

                <div className="col-lg-6 col-md-6 col-sm-10 col-xs-10  ov-checkout-location-cont">
               
                <form onSubmit={PlaceNewOrder} className="ov-checkout-location-form" >
                    <div className="ov-checkout-location-form-wrapper">
                    <p>Enter Location Details</p>
                                <div className="form-group">
                                    <select  className="form-control" name="district" value={district} onChange={handleOnChange}>
                                        <option>Soroti</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="Surbab / village eg Pamba" className="form-control" name="surbab" value={surbab} onChange={handleOnChange} />
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="Popular Point" className="form-control" name="popularPoint" value={popularPoint} onChange={handleOnChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" placeholder="Gate Descriptions" className="form-control" name="gateDescription" value={gateDescription} onChange={handleOnChange}/>
                                </div>


                                <div className="payment-cont">
                                    <div className="form-group">
                                        <label htmlFor="cash">Cash On Delivery</label>
                                        <input type="checkbox"  className="form-control" id="cash" name="paymentMethod" value={paymentMethod}  defaultChecked/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="momo">Mobile Money (coming soon)</label>
                                        <input type="checkbox"  className="form-control" id="momo" name="cashOnDelivery" disabled />
                                    </div>
                                </div>

                                
                            </div>

                            <button type="submit"  className="ov-checkout-next-btn " >OK</button>


                             

                  </form>
                  
                     
                </div> 



                        <div className="col-lg-5 col-md-5 col-sm-10 col-xs-10 ml-3 ov-checkout-payments">
                            
                         </div>
                       
                    </div> 
                    </Fragment>
                    : null
            
            }

        </div>
    )
}

export  default ClientDash;