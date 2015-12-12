"use strict";

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('product', {
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
      type: DataTypes.INTEGER.UNSIGNED,
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
    maintenanceVendorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Vendor
      }
    },
    desupportDate: {
      type: DataTypes.DATE,
      comment: 'The desupport date set by the vendor'
    },
    desupportNote: {
      type: DataTypes.STRING,
      comment: 'Any desupport notes, e.g. risks, actions, etc.'
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  return Product;
};
