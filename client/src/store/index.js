import { combineReducers } from 'redux';
import shopReducer from './firestore/shop/shop.reducers';
import transactionReducer from './firestore/transaction/transaction.reducers';
import customerReducer from './firestore/customer/customer.reducers';
import authReducer from './firestore/auth/auth.reducers';
import dashboardReducer from './dashboard/dashboard.reducers';
import { firebaseReducer } from 'react-redux-firebase';

const allReducers = combineReducers({
  shop: shopReducer,
  cart: transactionReducer,
  user: customerReducer,
  auth: authReducer,
  nav: dashboardReducer,
  firebase: firebaseReducer,
});

export default allReducers