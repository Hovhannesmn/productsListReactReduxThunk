import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './js/reducers/index';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './index.css';
import './css/loader.css';
import registerServiceWorker from './registerServiceWorker';
import dataChanger from './js/middleware/dataChanger';
import payment from './js/middleware/paymentMidleware';
import showCurrentProduct from './js/middleware/showCurrentProduct';


import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';


import  bootstrap  from  './js/helpers/index';

import Header from "./js/components/Header";
import Products from "./js/components/Products";
import WishList from "./js/components/WishList";
import Counter from "./js/components/Counter";

const middleware = [thunk, dataChanger, showCurrentProduct, payment];
const store = createStore(allReducers,applyMiddleware(...middleware));

bootstrap(store);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Counter/>
                <Switch>
                    <Route path='/wish-list' component={WishList} />
                    <Route path='/' component={Products} />
                </Switch>
            </div>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
