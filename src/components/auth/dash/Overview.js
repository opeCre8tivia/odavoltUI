import React, {useState,useEffect} from 'react';
import axios from 'axios';


const Overview =()=> {

    const [allOrders, setAllOrders] = useState([]);
    const [orderData, setOrderData] = useState({})

    console.log(orderData);

    

    useEffect(()=>{
        getOrders()
    },[]);

  //get all orders from the back end
  async function getOrders(){
   try {
    const res = await axios.get(`https://www.odavolt.com/api/new-orders`);
    if(res){
        setAllOrders(res.data);
    }
        } catch (err) {
            console.log(err.message);
        }  
     };

     
    //method to set order details to local storage according to the event target
    function showDetails(order){
        
        let detailCont = document.querySelector('.order-details');
        detailCont.style.display = 'block';
        //push order to component state so that it can be passed as props to orderDetails component
        setOrderData(order)
       
    }


    return (
        <div className="ov-dash-component-wrapper">
            <div className="row row-reset">
                    <div className="col-md-3 overview-top-row-cont number-users-cont cont-theme">
                        <h5>USERS</h5>
                        <div>
                            20
                        </div>

                    </div>

                    <div className="col-md-3 overview-top-row-cont cont-theme">
                        <h5>TODAY'S ORDERS</h5>
                        <div>
                            
                        </div>

                    </div>

                    <div className="col-md-3 overview-top-row-cont cont-theme">
                            <h5>ORDER GRAPH</h5>
                        <div>
                            
                        </div>

                    </div>
            </div>

            {/* new order section */}
            <div className="col-md-11 new-order-cont cont-theme">
                   <h5>NEW ORDERS</h5>
                      
                   <div className="ov-dash-scroll-cont">
                        {allOrders.length <= 0 ? <div className="noOrderWarning"  >NO ORDERS YET <p>STAY CALM GOD IS AT WORK</p></div> :
                        allOrders.map(order => order.status === 'new' ? <div className="new-order" key={order._id} >
                    
                        <div style={{width:'20%'}}><span className=" badge bg-danger new-tag"  style={{marginRight:'5px'}} >new order</span>{order.name }</div>
                        <div style={{width:'20%'}}>{order.mobile}</div>
                        <div style={{width:'10%'}}>{`${order.time.hours}:${order.time.minutes}`}</div>
                        
                                
                        <div className="order-info">
                            <span className="badge badge-primary " onClick={()=>{
                                showDetails(order)
                            }} >View Details</span>
                        </div>

                        <div className="ov-new-order-check-box">
                            <input type="checkbox" style={{cursor:'pointer'}} onClick={()=>{
                            // this.orderStatus(order)
                        }}  /></div>    
                         
                        </div> : '' )}
    
                    </div>
                    

                </div>
            </div>
     
    )
}
export default Overview
