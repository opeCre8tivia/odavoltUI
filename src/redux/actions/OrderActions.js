import axios from 'axios';
import {rootapi} from '../../rootapi'

export function placeOrder(orderData){
    return async function(dispatch){
        try {
            console.log(orderData)
            //set user to the headers
             //get token from local storage
             let token = JSON.parse(localStorage.getItem('ov_TKN_aUTh'))
             axios.defaults.headers.common['x-auth-token'] = token; //set headers

            const response = await axios.post(`${rootapi}/api/new-orders`,orderData);

                if(response.data.msg === 'ORDER PLACED'){
                    dispatch({type:'ORDER_SUCCESS'})
                    localStorage.removeItem('ov-client-orders');
                    
                }
                else if(response.data.error === true){
                    dispatch({type:'ORDER_FAIL'})
                }
            
            
        } catch (error) {
            console.log(error.message)
        }
    }
}