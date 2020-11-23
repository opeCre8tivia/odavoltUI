import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import AuthReducer from './AuthReducer';
import AlertReducer from './AlertReducer'
import ClientDashReducer from './ClientDashReducer';
import LoadingReducer from './LoadingReducer';
import ProductReducer from './ProductReducer';
import StoreReducer from './StoreReducer';
import NetworkReducer from './NetworkReducer'



const allReducers = combineReducers({
  cartReducer:cartReducer,
  AuthReducer:AuthReducer,
  AlertReducer:AlertReducer,
  ClientDashReducer:ClientDashReducer,
  LoadingReducer:LoadingReducer,
  ProductReducer:ProductReducer,
  StoreReducer:StoreReducer,
  NetworkReducer,
});

export default allReducers;