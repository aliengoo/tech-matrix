"use strict";

class TokenAdapter {
  constructor(models) {
    this.models = models;
  }

  create(username, token) {
    return this.models.sequelize.transaction((transaction) => {
      // delete the existing token
      return this.models.Token.destroy({
        where: {
          username
        }
      }, {transaction}).then(() => {
        // create a complete new token
        return this.models.Token.create({
          username,
          token,
          lastAccessed: Date.now()
        }, {transaction})
      })
    });
  }

  destroy(token) {
    return this.models.Token.destroy({
      where: {
        token
      }
    });
  }

  setLastAccessed(token) {
    return this.models.Token.update({lastAccessed: Date.now()}, {
      where: {
        token
      }
    });
  }
}

module.exports = TokenAdapter;
