"use strict";

module.exports = function (sequelize, DataTypes) {
  var Vendor = sequelize.define('Vendor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function (models) {
        Vendor.belongsToMany(models.Product, {
          through: "VendorProduct",
          onDelete: "CASCADE"
        });
      }
    }
  });

  return Vendor;
};

