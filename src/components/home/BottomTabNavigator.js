import React,{useEffect, useState} from 'react'

import {Link} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import CartMethods from '../reusable/classes/cartMethods'

const BottomTabNavigator = ()=> {
        //component state
        const [totalCartItemCount, setTotalCartItemCount] = useState(0)
    //redux state
    const dispatch = useDispatch()
    const {cartChange} = useSelector(state=>state.cartReducer)

    useEffect(()=>{
        let _homeTab = document.querySelector(".fa-home")
        if(window.location.pathname === '/'){
            _homeTab.style.color = "#F06723"
        }

        intersect()
    },[])

    useEffect(()=>{
            getTotalCartItemCount()
    },[cartChange])

    function getTotalCartItemCount(){
            //get all local storage items
            let lsItems = JSON.parse(localStorage.getItem("ov-client-orders"))
            if(lsItems === null){
                return null
            }
            lsItems.reduce((acc,item)=>{
                let total = acc + item.count
                setTotalCartItemCount(total)
            },0)
    }

    function isActive(e){
        
        let _homeTab = document.querySelector(".fa-home")
        let _categorytab = document.querySelector(".fa-xx")
        let _userTab = document.querySelector(".fa-user")
        let _cartTab = document.querySelector(".fa-cart-arrow-down")

    
         if(e.target.className === "fas fa-home tab-icon"){
            _homeTab.style.color = "#F06723"
            _userTab.style.color = "#717171"
            _cartTab.style.color = "#717171"
        }
        else if(e.target.className === "fas fa-user tab-icon"){
            _homeTab.style.color = "#717171"
            _cartTab.style.color = "#717171"
            _userTab.style.color = "#F06723"
        }
        else if(e.target.className === "fas fa-cart-arrow-down tab-icon"){
            _homeTab.style.color = "#717171"
            _userTab.style.color = "#717171"
            _cartTab.style.color = "#F06723"
        }
    }

    function intersect (){
        let _entry = document.querySelector(".bottom-tab-navigation")
        let observer = new IntersectionObserver((entries)=>{

        },{threshold:[0.2]})

        observer.observe(_entry)
    }

    return (
        <div className="bottom-tab-navigation" style={{position:'fixed'}} >
                {/* home */}
             <Link to="/" >
                   <div onClick={isActive} >
                        <div className="tab-icon-cont" > <i className="fas fa-home tab-icon"></i> </div>
                   </div>
             </Link> 

               {/* categories */}
               <div onClick={()=>{
                   const cartObject = new CartMethods(dispatch)
                   cartObject.showCart()

               }} >
                   <div className="tab-icon-cont" > <i className="fas fa-book tab-icon"></i> </div>
               </div>

                {/* user account */}
               <Link to="/user-dash" ><div onClick={(e)=>{
                  isActive(e)
               }} >
                   <div className="tab-icon-cont" > <i className="fas fa-user tab-icon"></i> </div>
               </div></Link>

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
