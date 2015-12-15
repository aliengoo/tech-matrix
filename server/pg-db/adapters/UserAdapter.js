"use strict";

let Q = require('q');
let bcrypt = require('bcrypt');

class UserAdapter {
  constructor(models) {
    this.models = models;
    this._comparePassword = this._comparePassword.bind(this);
    this._hashPassword = this._hashPassword.bind(this);
    this.findByUsername = this.findByUsername.bind(this);
    this.normalizeUsername = this.normalizeUsername.bind(this);
    this.doesUsernameExist = this.doesUsernameExist.bind(this);
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

  doesUsernameExist(username) {
    let d = Q.defer();

    this.models.User.count({
      where: {
        username
      }
    }).then(count => {
      console.log("count:" + count);
      d.resolve(count > 0);
    });

    return d.promise;
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

  normalizeUsername(username) {
    return username.trim().toLocaleLowerCase();
  }

  create(credentials) {
    let self = this;

    let d = Q.defer();

    credentials.username = this.normalizeUsername(credentials.username);

    self.doesUsernameExist(credentials.username).then((exists) => {
      if (exists) {
        d.reject({
          success: false,
          error: `Cannot create account because the username '${credentials.username}' is already taken.`
        });
      } else {

        const newUser = {
          username: credentials.username,
          passwordHash: undefined
        };

        self._hashPassword(credentials.password).then((passwordHash) => {
          newUser.passwordHash = passwordHash;

          self.models.User.create(newUser).then(
            user => d.resolve(user),
            error => d.reject(error));
        });
      }
    });

    return d.promise;
  }
}

module.exports = UserAdapter;