import { combineReducers } from 'redux';
import shopReducer from './firestore/shop/shop.reducers';

const allReducers = combineReducers({
  shop: shopReducer
});

export default allReducers