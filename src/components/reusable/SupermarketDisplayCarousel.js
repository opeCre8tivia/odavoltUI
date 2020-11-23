//this is implemented using react-multi-carousel
import React, {useEffect,useState}  from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {fetchStores} from '../../redux/actions'


import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


import SupermarketPreview from './SupermarketPreview';
import ProductPlaceholderLoader from './ProductPlaceholderLoader';


const SupermarketDisplayCarousel =({deviceType})=>{

 const dispatch = useDispatch()
 const {storeList} = useSelector(state => state.StoreReducer)
 const [items,setItems] = useState([])
 const [__loading,set__loading] = useState(false)




 useEffect(() => {
    dispatch(fetchStores())

 }, [])



    const responsive = {
        0: { items: 1 },
        310:{items:2},
        568:{ items: 3 },
        1024:{ items: 5 },
    };

       
    //elements to be passed as items in d item prop 
    //but display loader incase they have not yet loaded
    useEffect(()=>{
        if(storeList.length > 0){
            let _i = storeList.map((item)=> item.type.toLowerCase() === "supermarket" ?(
                <SupermarketPreview item={item} />
            ): null)
            setItems(_i)
            set__loading(false)
        }
        else{
            set__loading(true)
        }
    },[storeList])

    let bool;
    let boolArrow
    let w = window.innerWidth
    if(w < 568){
        bool = true
        boolArrow = false
    }
    else{
        bool = false
        boolArrow = true
    }


    return(
        <div style={{marginTop:"20px"}} >
         <div className="section-title">
             <p> Shop From Supermarkets in your area  </p>       
         </div>
       
         { __loading=== false ? <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            autoPlay={bool}
            paddingLeft={2}
            autoHeight={true}
            autoWidth={true}
            disableButtonsControls={boolArrow}
            disableDotsControl={true}
            autoPlayStrategy={"action"}
            autoPlayInterval={5000}
            infinite={false}

        /> :

        <ProductPlaceholderLoader/>
        
        }

        </div>

    )
}

export default SupermarketDisplayCarousel;


