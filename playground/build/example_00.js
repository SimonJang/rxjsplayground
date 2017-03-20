'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Printing date');
console.log((0, _moment2.default)().format());
alert((0, _moment2.default)().format());
console.log('End of printing line');