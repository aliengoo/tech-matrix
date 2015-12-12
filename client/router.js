"use strict";

import React from 'react';
import {Router, Route} from 'react-router';
import App from './views/App.jsx';
import LoginView from './views/login/LoginView.jsx';
import ProductsView from './views/products/ProductsView.jsx';
import ProductView from './views/product/ProductView.jsx';

let router = (
  <Router>
    <Route path="/" component={App}>
      <Route path="login" component={LoginView}/>
      <Route path="product" component={ProductView}/>
      <Route path="product/:id" component={ProductView}/>
      <Route path="products" components={ProductsView}/>
    </Route>
  </Router>
);

export default router;
