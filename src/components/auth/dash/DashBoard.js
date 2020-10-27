import React,{useState }from 'react'
import ManageProducts from './ManageProducts'
import ManageSupermarket from './ManageSupermarket'
import Overview from './Overview'
 
const DashBoard =()=> {

    // routing state

    const[dashRoute, SetDashRoute] = useState("overview")
    const [menuState, setMenuState] = useState("visible")


    return (
        <div className="container-fluid">
            {/* header  */}
            <div className="dash-top-header">
                <div className="dash-ov-logo-cont">
                    <img src={require("../../../assets/img/ov-letter-logo.svg")} alt="ov logo"/>
                </div>

                <div className="dash-ov-menu-toggle" onClick={()=>{
                    menuState === "visible" ? setMenuState("invisible") : setMenuState("visible")
                }} >
                     <span> <i className="fa fa-align-justify"></i></span>
                </div>
                <div className="dash-ov-profile-img-cont"> <img src={require('../../../assets/img/user-icon.png')} alt="profile"/> </div>
            </div>


            <div className="main-dash-inner-container">
                {/* dash menu */}
                {/* conditionally render the menu */}
                {menuState === 'visible'?
                        <div className="ov-dash-menu-cont">

                        <div className="dash-menu-item" onClick={()=>{
                            SetDashRoute("overview")
                        }}>Overview</div>

                        <div className="dash-menu-item" onClick={()=>{
                            SetDashRoute("manageproducts")
                        }}>Manage Products</div>

                        <div className="dash-menu-item" onClick={()=>{
                            SetDashRoute("managesupermarket")
                        }}>Manage Super Markets</div>

                        <div className="dash-menu-item">Overview</div>
                        <div className="dash-menu-item">Overview</div>
    
                    </div> :null
            
            
                }

                <div className="content-inner-wrapper">
                   { 
                    
                    dashRoute === "overview"? <Overview/> :
                    dashRoute === "manageproducts" ? <ManageProducts/> :
                    dashRoute === "managesupermarket" ? <ManageSupermarket/> : ""


                    }

                </div>

            </div>

        </div>
    )
   }

export default DashBoard
