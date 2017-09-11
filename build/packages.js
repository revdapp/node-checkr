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

var packages = function packages(options) {
  return {
    list: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/packages',
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 3:
                res = _context.sent;
                return _context.abrupt('return', res.data);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                (0, _handleError2.default)(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 7]]);
      }));

      return function list() {
        return _ref.apply(this, arguments);
      };
    }(),
    retrieve: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var alphaRegex, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                alphaRegex = /^[a-z0-9]+/i;

                if (!alphaRegex.test(id)) {
                  _context2.next = 14;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return (0, _axios2.default)({
                  method: 'get',
                  url: options.baseUrl + '/' + options.apiVersion + '/packages/' + id,
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
                _context2.next = 16;
                break;

              case 14:
                throw new Error('Invalid ID');

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[2, 9]]);
      }));

      return function retrieve(_x) {
        return _ref2.apply(this, arguments);
      };
    }(),
    create: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        var schema, validation, res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                schema = _joi2.default.object().keys({
                  name: _joi2.default.string().alphanum().min(3).required(),
                  slug: _joi2.default.string().alphanum().min(3).required(),
                  screenings: _joi2.default.array().required()
                });
                validation = _joi2.default.validate(params, schema);

                if (!(validation.error !== null)) {
                  _context3.next = 4;
                  break;
                }

                throw new Error(validation.error);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _axios2.default)({
                  method: 'post',
                  url: options.baseUrl + '/' + options.apiVersion + '/packages',
                  data: params,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 7:
                res = _context3.sent;
                return _context3.abrupt('return', res.data);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](4);

                (0, _handleError2.default)(_context3.t0);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[4, 11]]);
      }));

      return function create(_x2) {
        return _ref3.apply(this, arguments);
      };
    }()
  };
};

exports.default = packages;