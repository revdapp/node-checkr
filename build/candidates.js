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

var candidates = function candidates(options) {
  return {
    create: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
        var schema, validation, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = _joi2.default.object().keys({
                  first_name: _joi2.default.string().alphanum().min(3).required(),
                  middle_name: _joi2.default.string().alphanum(),
                  last_name: _joi2.default.string().alphanum().min(3).required(),
                  email: _joi2.default.string().email(),
                  phone: _joi2.default.string().alphanum().min(3).max(12),
                  zipcode: _joi2.default.string().alphanum().min(3).max(10),
                  dob: _joi2.default.string().alphanum().min(8).max(10),
                  ssn: _joi2.default.string().alphanum().min(3).max(14),
                  driver_license_number: _joi2.default.string().alphanum().min(3).max(14),
                  driver_license_state: _joi2.default.string().alphanum().min(1).max(6)
                });
                validation = _joi2.default.validate(params, schema);

                if (!params.middle_name || params.middle_name === null || params.middle_name === undefined) {
                  params.no_middle_name = true;
                }

                if (!(validation.error !== null)) {
                  _context.next = 5;
                  break;
                }

                throw new Error(validation.error);

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return (0, _axios2.default)({
                  method: 'post',
                  url: options.baseUrl + '/' + options.apiVersion + '/candidates',
                  data: params,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 8:
                res = _context.sent;
                return _context.abrupt('return', res.data);

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](5);

                (0, _handleError2.default)(_context.t0);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[5, 12]]);
      }));

      return function create(_x) {
        return _ref.apply(this, arguments);
      };
    }(),

    update: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, params) {
        var schema, validation, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                schema = _joi2.default.object().keys({
                  first_name: _joi2.default.string().alphanum().min(3).required(),
                  middle_name: _joi2.default.string().alphanum(),
                  last_name: _joi2.default.string().alphanum().min(3).required(),
                  email: _joi2.default.string().email(),
                  phone: _joi2.default.string().alphanum().min(3).max(12),
                  zipcode: _joi2.default.string().alphanum().min(3).max(10),
                  dob: _joi2.default.string().alphanum().min(8).max(10),
                  ssn: _joi2.default.string().alphanum().min(3).max(14),
                  driver_license_number: _joi2.default.string().alphanum().min(3).max(14),
                  driver_license_state: _joi2.default.string().alphanum().min(1).max(6)
                });

                if (!(!id || id === undefined || id === null)) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('Update Candidate - Missing or invalid ID');

              case 3:
                validation = _joi2.default.validate(params, schema);

                if (!params.middle_name || params.middle_name === null || params.middle_name === undefined) {
                  params.no_middle_name = true;
                }

                if (!(validation.error !== null)) {
                  _context2.next = 7;
                  break;
                }

                throw new Error(validation.error);

              case 7:
                _context2.prev = 7;
                _context2.next = 10;
                return (0, _axios2.default)({
                  method: 'post',
                  url: options.baseUrl + '/' + options.apiVersion + '/candidates/' + id,
                  data: params,
                  auth: {
                    username: options.apiKey,
                    password: ''
                  }
                });

              case 10:
                res = _context2.sent;
                return _context2.abrupt('return', res.data);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2['catch'](7);

                (0, _handleError2.default)(_context2.t0);

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[7, 14]]);
      }));

      return function update(_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  };
};

exports.default = candidates;