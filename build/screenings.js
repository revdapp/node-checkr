'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* ============================================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * node.checkr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * https://github.com/franciscofsales/node-checkr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ============================================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright 2014-2017, Francisco Sales
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Released under the MIT License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ============================================================ */

var screenings = function screenings(options) {
  return {
    ssn_trace: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context.next = 12;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/ssn_traces/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context.sent;
                return _context.abrupt('return', res.data);

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                (0, _handleError2.default)(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[2, 9]]);
      }));

      return function ssn_trace(_x) {
        return _ref.apply(this, arguments);
      };
    }(),
    sex_offender: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context2.next = 12;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/sex_offender_searches/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context2.sent;
                return _context2.abrupt('return', res.data);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                (0, _handleError2.default)(_context2.t0);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[2, 9]]);
      }));

      return function sex_offender(_x2) {
        return _ref2.apply(this, arguments);
      };
    }(),
    global_watchlist: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context3.next = 12;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/global_watchlist_searches/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context3.sent;
                return _context3.abrupt('return', res.data);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](2);

                (0, _handleError2.default)(_context3.t0);

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[2, 9]]);
      }));

      return function global_watchlist(_x3) {
        return _ref3.apply(this, arguments);
      };
    }(),
    national_criminal: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context4.next = 12;
                  break;
                }

                _context4.prev = 2;
                _context4.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/national_criminal_searches/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context4.sent;
                return _context4.abrupt('return', res.data);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](2);

                (0, _handleError2.default)(_context4.t0);

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined, [[2, 9]]);
      }));

      return function national_criminal(_x4) {
        return _ref4.apply(this, arguments);
      };
    }(),
    county_criminal: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context5.next = 12;
                  break;
                }

                _context5.prev = 2;
                _context5.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/county_criminal_searches/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context5.sent;
                return _context5.abrupt('return', res.data);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](2);

                (0, _handleError2.default)(_context5.t0);

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined, [[2, 9]]);
      }));

      return function county_criminal(_x5) {
        return _ref5.apply(this, arguments);
      };
    }(),
    state_criminal: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context6.next = 12;
                  break;
                }

                _context6.prev = 2;
                _context6.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/state_criminal_searches/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context6.sent;
                return _context6.abrupt('return', res.data);

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6['catch'](2);

                (0, _handleError2.default)(_context6.t0);

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[2, 9]]);
      }));

      return function state_criminal(_x6) {
        return _ref6.apply(this, arguments);
      };
    }(),
    motor_vehicle: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context7.next = 12;
                  break;
                }

                _context7.prev = 2;
                _context7.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/motor_vehicle_reports/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context7.sent;
                return _context7.abrupt('return', res.data);

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](2);

                (0, _handleError2.default)(_context7.t0);

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined, [[2, 9]]);
      }));

      return function motor_vehicle(_x7) {
        return _ref7.apply(this, arguments);
      };
    }(),
    education_verifications: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context8.next = 12;
                  break;
                }

                _context8.prev = 2;
                _context8.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/education_verifications/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context8.sent;
                return _context8.abrupt('return', res.data);

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8['catch'](2);

                (0, _handleError2.default)(_context8.t0);

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined, [[2, 9]]);
      }));

      return function education_verifications(_x8) {
        return _ref8.apply(this, arguments);
      };
    }(),
    employment_verifications: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context9.next = 12;
                  break;
                }

                _context9.prev = 2;
                _context9.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/employment_verifications/' + id,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 5:
                res = _context9.sent;
                return _context9.abrupt('return', res.data);

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9['catch'](2);

                (0, _handleError2.default)(_context9.t0);

              case 12:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined, [[2, 9]]);
      }));

      return function employment_verifications(_x9) {
        return _ref9.apply(this, arguments);
      };
    }()
  };
};

exports.default = screenings;