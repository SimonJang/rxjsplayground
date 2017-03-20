'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testArray = ['test', 'test2', 'test3'];

// 0.5s interval, 5 times

_Rx2.default.Observable.interval(500).take(5).subscribe((0, _util.createSubscriber)('interval'));

// Returns a single value

_Rx2.default.Observable.of('Hello world').subscribe((0, _util.createSubscriber)('hello world'));

// Loops through the array, converts an array into a stream of arrays

_Rx2.default.Observable.from(testArray).subscribe((0, _util.createSubscriber)('Array with from test'));

// Returns the whole array

_Rx2.default.Observable.of(testArray).subscribe((0, _util.createSubscriber)('Array with of test'));

// Throw an error, stops the sequence when an error is thrown
// doesn't work with 'from' and 'of'

_Rx2.default.Observable.throw(new Error('A test error')).subscribe((0, _util.createSubscriber)('Error'));

// Empty, doesn't show anything but outputs only completes

_Rx2.default.Observable.empty().subscribe((0, _util.createSubscriber)('Empty example'));

// Defer: Works as a close that can generate a value

var sideeffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {
    sideeffect++;
    return _Rx2.default.Observable.of(sideeffect);
});

defer$.subscribe((0, _util.createSubscriber)('Defer 1'));
defer$.subscribe((0, _util.createSubscriber)('Defer 2'));

// Never, doesn't output no items, never completes

_Rx2.default.Observable.never().subscribe((0, _util.createSubscriber)('Never'));

// Range, start number and a total count

_Rx2.default.Observable.range(10, 5).subscribe((0, _util.createSubscriber)('Value 10, 5 times starting from 10'));