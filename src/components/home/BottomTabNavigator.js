import React,{useEffect, useState} from 'react'

import {NavLink} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import CartMethods from '../reusable/classes/cartMethods'

const BottomTabNavigator = ()=> {
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

    // function isActive(e){
        
    //     let _homeTab = document.querySelector(".fa-home")
    //     let _categorytab = document.querySelector(".fa-xx")
    //     let _userTab = document.querySelector(".fa-user")
    //     let _cartTab = document.querySelector(".fa-cart-arrow-down")

    
    //      if(e.target.className === "fas fa-home tab-icon"){
    //         _homeTab.style.color = "#F06723"
    //         _userTab.style.color = "#717171"
    //         _cartTab.style.color = "#717171"
    //     }
    //     else if(e.target.className === "fas fa-user tab-icon"){
    //         _homeTab.style.color = "#717171"
    //         _cartTab.style.color = "#717171"
    //         _userTab.style.color = "#F06723"
    //     }
    //     else if(e.target.className === "fas fa-cart-arrow-down tab-icon"){
    //         _homeTab.style.color = "#717171"
    //         _userTab.style.color = "#717171"
    //         _cartTab.style.color = "#F06723"
    //     }
    // }

    function intersect (){
        let _entry = document.querySelector(".bottom-tab-navigation")
        let observer = new IntersectionObserver((entries)=>{

        },{threshold:[0.2]})

        observer.observe(_entry)
    }

    return (
        <div className="bottom-tab-navigation" style={{position:'fixed'}} >
                {/* home */}
             <NavLink to="/" activeStyle={{color:"orange"}} >
                   <div >
                        <div className="tab-icon-cont" > <i className="fas fa-home tab-icon"></i> </div>
                   </div>
             </NavLink> 

               {/* categories */}
               <div onClick={()=>{
                   const cartObject = new CartMethods(dispatch)
                   cartObject.showCart()

               }} >
                   <div className="tab-icon-cont" > <i className="fas fa-list-alt tab-icon"></i> </div>
               </div>

                {/* user account */}
               <NavLink to="/user-dash" className="tab-icon-cont" ><div >
                   <div  > <i className="fas fa-user tab-icon"></i> </div>
               </div></NavLink>

               {/* cart */}
               <div onClick={(e)=>{
                   const cartObject = new CartMethods(dispatch)
                   cartObject.showCart()
                   

                  
               }}  >
                   <div className="tab-icon-cont" > <i className="fas fa-cart-arrow-down tab-icon"></i> </div>
                   <span className="tab-cart-item-count" > {totalCartItemCount} </span>
               </div>

            </div> 
    )
}

export default BottomTabNavigator
