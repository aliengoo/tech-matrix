"use strict";

let ldapConfig = require('../config/config').ldap;
let ldap = require('ldapjs');
let Q = require('q');

function authenticate(username, password) {
  let defer = Q.defer();

  let client = ldap.createClient({
    url: ldapConfig.url
  });

  client.bind(`uid=${username},${ldapConfig.usersDn}`, password, (err) => {
    client.unbind();
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve({
        ok: true
      });
    }
  });

  return defer.promise;
}

module.exports = authenticate;
