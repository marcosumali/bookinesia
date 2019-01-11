import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { CookiesProvider } from 'react-cookie';
import { Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import App from './App';
import * as serviceWorker from './serviceWorker';
import allReducers from './store';
import firebaseConfig from './config/firebase.config';

const rrfConfig = {
  useFirestoreForProfile: true,
  userProfile: 'customer', 
}

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, rrfConfig)
  )
);

const history = createBrowserHistory();

ReactDOM.render(
    <CookiesProvider>
      <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
      </Router>
    </CookiesProvider>
  ,document.getElementById('root')
);

serviceWorker.unregister();
