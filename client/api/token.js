"use strict";

import store from 'store';

const TechMatrixToken = "tech-matrix-token";

module.exports = {
  get: function () {
    return store.get(TechMatrixToken);
  },

  set: function (token = undefined) {
    store.set(TechMatrixToken, token);

    return token;
  }
};
