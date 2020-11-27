import React,{useEffect, useState} from 'react'

import {Link} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import CartMethods from '../reusable/classes/cartMethods'

const BottomTabNavigator = (props)=> {
        console.log(window.location.pathname)
        //component state
        const [totalCartItemCount, setTotalCartItemCount] = useState(0)
    //redux state
    const dispatch = useDispatch()
    const {cartChange} = useSelector(state=>state.cartReducer)

    // useEffect(()=>{
    //     let _homeTab = document.querySelector(".fa-home")
    //     if(window.location.pathname === '/'){
    //         _homeTab.style.color = "#F06723"
    //     }

    //     intersect()
    // },[])

    useEffect(()=>{
            getTotalCartItemCount()
    },[cartChange])

    function getTotalCartItemCount(){
            //get all local storage items
            let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
            if(lsItems === null){
                return null
            }
            let total = 0;
            lsItems.forEach(item => {
                    total = total + item.count
                });
            setTotalCartItemCount(total)
           
    }

    //call and validate path on rerender
    useEffect(()=>{
        let _noevent = {
            target:{
                className:"fa null"
            }
        }
        isActive(_noevent)
    },[])

    function isActive(e){
        console.log('called...')
        let _homeTab = document.querySelector(".fa-home")
        let _notificationTab = document.querySelector(".fa-bell")
        let _userTab = document.querySelector(".fa-user")
        let _cartTab = document.querySelector(".fa-cart-arrow-down")

            console.log(e.target.className)
    
         if(e.target.className === "fas fa-home tab-icon" || window.location.pathname === '/'){
            _homeTab.style.color = "#F06723"
            _userTab.style.color = "#717171"
            _cartTab.style.color = "#717171"
            _notificationTab.style.color = "#717171"
        }
        else if(e.target.className === "fas fa-user tab-icon" || window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/client-dash'){
            console.log('user tab')
            _homeTab.style.color = "#717171"
            _cartTab.style.color = "#717171"
            _notificationTab.style.color = "#717171"
            _userTab.style.color = "#F06723"
        }
        else if(e.target.className === "fas fa-cart-arrow-down tab-icon"){
            _homeTab.style.color = "#717171"
            _notificationTab.style.color = "#717171"
            _userTab.style.color = "#717171"
            _cartTab.style.color = "#F06723"
        }
        else if(e.target.className === "fas fa-bell tab-icon"){
            _notificationTab.style.color = "#F06723"
            _homeTab.style.color = "#717171"
            _userTab.style.color = "#717171"
            _cartTab.style.color = "#717171"
        }
    }


    return (
        <div className="bottom-tab-navigation" style={{position:'fixed'}} >
                {/* home */}
             <Link to="/" >
                   <div onClick={(e)=>{
                         isActive(e)
                    }}>
                        <div className="tab-icon-cont" > <i className="fas fa-home tab-icon"></i> </div>
                   </div>
             </Link> 

               {/* notification */}
               <div onClick={(e)=>{
                   const cartObject = new CartMethods(dispatch)
                   cartObject.showCart()
                   isActive(e)

               }} >
                   <div className="tab-icon-cont" > <i className="fas fa-bell tab-icon"></i> </div>
               </div>

                {/* user account */}
               <Link to="/user-dash"  >
                   <div onClick={(e)=>{
                       isActive(e)
                   }} >
                        <div className="tab-icon-cont" > <i className="fas fa-user tab-icon"></i> </div>
                   </div>
               </Link>

               {/* cart */}
               <div onClick={(e)=>{
                   const cartObject = new CartMethods(dispatch)
                   cartObject.showCart()
                   isActive(e)
                   

                  
               }}  >
                   <div className="tab-icon-cont" > <i className="fas fa-cart-arrow-down tab-icon"></i> </div>
                   <span className="tab-cart-item-count" > {totalCartItemCount} </span>
               </div>

            </div> 
    )
}

export default BottomTabNavigator
