"use strict";

module.exports = function defaultErrorHandler(res) {
  return function(error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
};