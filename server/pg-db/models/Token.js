"use strict";

module.exports = function (sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lastAccessed: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Token;
};