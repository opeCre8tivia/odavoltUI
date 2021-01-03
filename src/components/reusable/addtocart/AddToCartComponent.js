/*this component is responsible for all the functionality related to
* adding an item to the cart
*/
import React from 'react'
import {useDispatch} from "react-redux";

import RoundBtn from "./RoundBtn"
import CartMethods from '../classes/cartMethods'



const AddToCartComponent =({item})=> {
    
    //component state
    //const [isinLocalStorage,setIsinLocalStorage] = useState(false)
    //redux state
    const dispatch = useDispatch()

  

        /*------------ Add to cart function ----------*/
        const  addToCart =  (item) =>{
            const cartObject = new CartMethods(dispatch)
            cartObject.addToCart(item)
        }
        

           function decreament(item){
                const cartObject = new CartMethods(dispatch)
                cartObject.decreament(item)
                
            }

    return (
      <div style={styles.mainContainer}>
            { item.isinLocalStorage === undefined ?  <div style={styles.addTextContainer}>ADD</div> :
                <>
                <div className="minus-btn-cont"><RoundBtn  item={item}  value="-" decreament={decreament} /></div>
            
                <div className="number-btn-cont"> {item.count} </div>
                </>
            }
            
            <div className="plus-btn-cont"><RoundBtn  item={item}  value="+"  addToCart={addToCart} /></div>
        </div>
    )
}

const styles = {
    mainContainer:{
        width:"100px",
	    height:"24px",
	    borderRadius:"12px",
	    marginRight:"2px",
	    backgroundColor:"var(--ov-primary)",
	    position:"relative",
    },
    addTextContainer:{
        position: "absolute",
        left:"10px",
        top:"50%",
        transform: "translateY(-50%)",
        height:"18px",
        width:"40px",
        marginLeft:"2px",
        marginRight:"2px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontFamily:"Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontSize:"80%",
        color:"#ffffff",
    }
}
export default AddToCartComponent