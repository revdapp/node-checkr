'use strict';

var _candidates = require('./candidates');

var _candidates2 = _interopRequireDefault(_candidates);

var _reports = require('./reports');

var _reports2 = _interopRequireDefault(_reports);

var _packages = require('./packages');

var _packages2 = _interopRequireDefault(_packages);

var _screenings = require('./screenings');

var _screenings2 = _interopRequireDefault(_screenings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* ============================================================
                                                                                                                                                           * node.checkr
                                                                                                                                                           * https://github.com/franciscofsales/node-checkr
                                                                                                                                                           *
                                                                                                                                                           * ============================================================
                                                                                                                                                           * Copyright 2014-2017, Francisco Sales
                                                                                                                                                           * Released under the MIT License
                                                                                                                                                           * ============================================================ */

var NodeCheckr = function NodeCheckr(API_KEY) {
  _classCallCheck(this, NodeCheckr);

  if (API_KEY === null || API_KEY === undefined) {
    console.error('Invalid or missing API_KEY');
    return false;
  }
  this.options = {
    baseUrl: 'https://api.checkr.com',
    apiVersion: 'v1',
    apiKey: API_KEY,
    verbose: false
  };
  this.Candidates = (0, _candidates2.default)(this.options);
  this.Reports = (0, _reports2.default)(this.options);
  this.Packages = (0, _packages2.default)(this.options);
  this.Screenings = (0, _screenings2.default)(this.options);
};

module.exports = NodeCheckr;