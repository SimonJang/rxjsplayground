'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Rx2.default.Observable.interval(1000).merge(_Rx2.default.Observable.interval(500)).take(5).subscribe((0, _util.createSubscriber)('Showcasing merge operator'));

_Rx2.default.Observable.merge(_Rx2.default.Observable.interval(1000).map(function (i) {
    return i + ' seconds';
}), _Rx2.default.Observable.interval(500).map(function (i) {
    return i + ' seconds';
})).take(10).subscribe((0, _util.createSubscriber)('Another example of the merge operator'));

_Rx2.default.Observable.concat(_Rx2.default.Observable.interval(1000).map(function (i) {
    return i + ' seconds';
}).take(3), _Rx2.default.Observable.interval(500).map(function (i) {
    return i + ' seconds';
}).take(3)).subscribe((0, _util.createSubscriber)('Showcasing concat operator'));