"use strict";

let Q = require('q');
let bcrypt = require('bcrypt');

class UserAdapter {
  constructor(models) {
    this.models = models;
    this._comparePassword = this._comparePassword.bind(this);
    this._hashPassword = this._hashPassword.bind(this);
  }

  _comparePassword(password, passwordHash) {
    let d = Q.defer();
    bcrypt.compare(password, passwordHash, (err, isPasswordMatch) => {
      if (err) {
        d.reject(err);
      } else if (isPasswordMatch) {
        d.resolve();
      } else {
        d.reject();
      }
    });

    return d.promise;
  }

  _hashPassword(password) {
    let d = Q.defer();

    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        d.reject(err);
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            d.reject(err);
          } else {
            d.resolve(hash);
          }
        });
      }
    });

    return d.promise;
  }

  findByUsername(username) {
    return this.models.User.findOne({
      where: {
        username
      }
    });
  }

  authenticate(credentials) {
    let d = Q.defer();

    this.findByUsername(credentials.username).then((user) => {
      if (!user) {
        d.reject({
          success: false,
          error: "User not found"
        });
      } else {
        this._comparePassword(credentials.password, user.passwordHash).then(() => {
          d.resolve({
            success: true
          });
        }, (error) => {
          let rejection = {
            success: false
          };

          if (error) {
            rejection.error = error;
          }

          d.reject(rejection);
        });
      }
    });

    return d.promise;
  }

  create(credentials) {
    return this.models.User.create({
      ...credentials,
      accountLocked: false
    });
  }
}