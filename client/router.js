"use strict";

import React from 'react';
import {Router, Route} from 'react-router';
import App from './views/App.jsx';
import LoginView from './views/login/LoginView.jsx';
import RegistrationView from './views/registration/RegistrationView.jsx';
import TestView from './views/test/TestView.jsx';
import ProductsView from './views/products/ProductsView.jsx';
import ProductView from './views/product/ProductView.jsx';
import NotFoundView from './views/not-found/NotFoundView.jsx';
import AuthenticationApi from './common/AuthenticationApi';
import AboutView from './views/about/AboutView.jsx';

let authenticationApi = new AuthenticationApi();

// TODO: https://github.com/rackt/react-router/issues/2670
function requireAuth(nextState, replaceState, callback) {
  authenticationApi.verify().then((responseData) => {
    callback();
  }).catch((responseData) => {
    if (responseData.status === 401 || responseData.status === 403) {
      replaceState({nextPathname: nextState.location.pathname}, '/login');
      callback();
    }
  });
}

let router = (
  <Router>
    <Route path="/" component={App}>
      <Route path="auth" onEnter={requireAuth}>
        <Route path="about" component={AboutView}/>
        <Route path="product" component={ProductView}/>
        <Route path="product/:id" component={ProductView}/>
        <Route path="products" components={ProductsView}/>
      </Route>
      <Route path="test" component={TestView}/>
      <Route path="login" component={LoginView}/>
      <Route path="registration" component={RegistrationView}/>
      <Route path="*" component={NotFoundView}/>
    </Route>
  </Router>
);

export default router;
