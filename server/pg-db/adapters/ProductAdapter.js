"use strict";

let Q = require('q');

class ProductAdapter {
  constructor(models) {
    this.models = models;
    this._findAllVendors = this._findAllVendors.bind(this);
    this._createWithVendors = this._createWithVendors.bind(this);
    this.findById = this.findById.bind(this);
  }

  findById(id) {
    var self = this;

    return self.models.Product.findOne({
      include: [
        {model: self.models.Vendor, as: "Vendors"}
      ],
      where: {
        id: parseInt(id)
      }
    });
  }

  create(product) {
    let self = this;

    return self._findAllVendors(product).then(function(vendors) {
      return self._createWithVendors(product, vendors);
    });
  }

  _createWithVendors(product, vendors) {
    let defer = Q.defer();
    this.models.Product.create(product).then((newProduct) => {
      if (vendors.length > 0) {
        newProduct.setVendors(vendors);
      }
      defer.resolve(newProduct);
    }).catch(error => defer.reject(error));

    return defer.promise;
  }

  _findAllVendors(product) {
    var defer = Q.defer();

    if (product.Vendors) {
      this.models.Vendor.findAll({
        where: {
          $or: [{
            id: product.Vendors
          }]
        }
      }).then((vendors) => {
        defer.resolve(vendors);
      }).catch((error) => {
        defer.reject(error);
      });
    } else {
      defer.resolve([]);
    }

    return defer.promise;
  }
}

module.exports = ProductAdapter;
