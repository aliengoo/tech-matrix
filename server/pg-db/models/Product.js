"use strict";

module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'The name of the product.  This must be unique'
    },
    isSupported: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    keymanRiskFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    riskRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {min: 0, max: 5}
    },
    riskNote: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maintenanceEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'The date the maintenance ends for the product'
    },
    maintenanceNote: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Any notes related to the maintenance for the product'
    },
    desupportDate: {
      type: DataTypes.DATE,
      comment: 'The desupport date set by the vendor'
    },
    desupportNote: {
      type: DataTypes.STRING,
      comment: 'Any desupport notes, e.g. risks, actions, etc.'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsToMany(models.Vendor, {
          as: "Vendors",
          through: "VendorProducts",
          foreignKey: 'productId'
        });
      }
    }
  });

  return Product;
};
