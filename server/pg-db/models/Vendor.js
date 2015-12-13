"use strict";

module.exports = function (sequelize, DataTypes) {
  var Vendor = sequelize.define('Vendor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function (models) {
        Vendor.belongsToMany(models.Product,
          {
            as: "Products",
            through: "VendorProducts",
            foreignKey: "vendorId"
          });
      }
    }
  });

  return Vendor;
};

