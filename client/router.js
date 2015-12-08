"use strict";

import React from 'react';
import {Router, Route} from 'react-router';
import ProductView from './views/product/ProductView.jsx';

let router = (
  <Router>
    <Route path="/product" component={ProductView}/>
    <Route path="/product/:id" component={ProductView}/>
  </Router>
);

export default router;
