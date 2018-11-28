import { combineReducers } from 'redux';
import shopReducer from './firestore/shop/shop.reducers';
import transactionReducer from './firestore/transaction/transaction.reducers';
import customerReducer from './firestore/customer/customer.reducers';

const allReducers = combineReducers({
  shop: shopReducer,
  cart: transactionReducer,
  user: customerReducer
});

export default allReducers