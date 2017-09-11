'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleError = function handleError(error) {
  var Err = null;
  switch (error.response.status) {
    case 401:
      Err = new Error('Invalid Authentication. Check your API key');
      break;
  }
  throw Err;
};

exports.default = handleError;