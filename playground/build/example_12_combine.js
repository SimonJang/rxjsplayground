'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Basic example of what the zip function does

// function arrayZip(array1, array2, selector) {
//     const count = Math.min(array1.length, array2.length);
//     const results = [];

//     for(let i = 0; i < count; i++) {
//         const combined = selector(array1[i],  array2[i]);
//         results.push(combined);
//     }

//     return results;
// }

// const array1 = [1,2,3,4,5];
// const array2 = [6,7,8,9,10];

// const result = arrayZip(array1, array2, (left,right) => left * right);

// console.log(result);

_Rx2.default.Observable.range(1, 10).zip(_Rx2.default.Observable.interval(500), function (left, right) {
    return 'item: ' + left + ', at ' + right * 500;
}).subscribe((0, _util.createSubscriber)('Showcasing zip operator'));

_Rx2.default.Observable.interval(1000).withLatestFrom(_Rx2.default.Observable.interval(500)).subscribe((0, _util.createSubscriber)('Showcasing withLatestFrom operator'));