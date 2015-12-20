"use strict";
global.jQuery = require('jquery');
global.$ = global.jQuery;
require('bootstrap');
global.Parsley = require('parsleyjs');

import './common/httpInterceptors';
import React from 'react';
import ReactDOM from 'react-dom';

import router from './router';

ReactDOM.render(router, document.getElementById("react-container"));