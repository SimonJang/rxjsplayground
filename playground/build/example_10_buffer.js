'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Buffer changed in version 5, so watch out when used in the current version 4

// Rx.Observable.range(1, 100)
//     .bufferCount(10) // Buffering in 10 items for each array
//     .subscribe(createSubscriber('Showcasing bufferCount operator'));


// Rx.Observable.interval(500)
//     .take(4)
//     .bufferTime(2000)
//     .subscribe(createSubscriber('Showcasing bufferTime operator'));


// Rx.Observable.interval(500)
//     .take(5)
//     .buffer(Rx.Observable.interval(2000).take(5))
//     .subscribe(createSubscriber('Showcasing the buffer operator'));


_Rx2.default.Observable.range(1, 10).toArray() // Wants to emit the whole value in 1 time
.subscribe((0, _util.createSubscriber)('Showcasing toArray operator'));