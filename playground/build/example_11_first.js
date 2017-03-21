'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simple$ = new _Rx2.default.Observable(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
});

// Only processes the first element
simple$.first().subscribe((0, _util.createSubscriber)('Showcasing the first operator'));

// Only processes the last element
simple$.last().subscribe((0, _util.createSubscriber)('Showcasing the last operator'));

// Can only process a single observable
simple$.single().subscribe((0, _util.createSubscriber)('Showcasing the single operator'));

// Processing x amount of elements, depending on take argument
simple$.take(2).subscribe((0, _util.createSubscriber)('Showcasing the take operator'));

// Processing last x amount of elements, depdning on skip argument
simple$.skip(2).subscribe((0, _util.createSubscriber)('Showcasing the skip operator'));

_Rx2.default.Observable.interval(500).skipWhile(function (i) {
    return i < 4;
}).takeWhile(function (i) {
    return i < 10;
}).subscribe((0, _util.createSubscriber)('Showcasing skipWhile and takeWile operators'));

_Rx2.default.Observable.interval(500).skipUntil(_Rx2.default.Observable.timer(2000)).takeUntil(_Rx2.default.Observable.timer(4000)).subscribe((0, _util.createSubscriber)('Showcasing the skipUntil operator'));