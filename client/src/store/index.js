import { combineReducers } from 'redux';
import shopReducer from './firestore/shop/shop.reducers';
import transactionReducer from './firestore/transaction/transaction.reducers';

const allReducers = combineReducers({
  shop: shopReducer,
  cart: transactionReducer
});

export default allReducers