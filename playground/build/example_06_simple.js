'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Rx2.default.Observable.range(1, 10).do(function (a) {
    return console.log('From do operator ' + a);
}) // Process the stream, creating side effects
.map(function (a) {
    return a * a;
}).subscribe((0, _util.createSubscriber)('Showcasing map operator'));

_Rx2.default.Observable.range(1, 10).finally(function () {
    return console.log('From Finally');
}) // Final output when the observable is completed
.map(function (a) {
    return a + 10;
}).subscribe((0, _util.createSubscriber)('Showcasing finally operator'));

_Rx2.default.Observable.range(1, 10).filter(function (a) {
    return a <= 5;
}) // Filtering the stream
.subscribe((0, _util.createSubscriber)('Showcasing filter operator'));

_Rx2.default.Observable.interval(8000).startWith(-1) // Start with a specific element
.subscribe((0, _util.createSubscriber)('Showcasing interval operator'));