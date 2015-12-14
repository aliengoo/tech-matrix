"use strict";

let ldapConfig = require('../config/config').ldap;
let ldap = require('ldapjs');
let Q = require('q');

function authenticate(username, password) {
  let defer = Q.defer();

  let client = ldap.createClient({
    url: ldapConfig.url
  });

  let bind = `sAMAccountName=${username},${ldapConfig.usersDn}`;

  console.log(bind);

  client.bind(bind, password, (err) => {
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
