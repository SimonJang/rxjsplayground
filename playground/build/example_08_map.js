'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Map just transforms
// Equal to select in SQL/LINQ

_Rx2.default.Observable.interval(1000).take(3).map(function (a) {
    return a * a;
}).subscribe((0, _util.createSubscriber)('Showcasing map operator'));

// function arrayMap(array, projection) {
//     const returnArray = [];
//     for(let item of array) {
//         const projected = projection(item);
//         returnArray.push(projected);
//     }

//     return returnArray;
// }

// function arrayMergeMap(array, projection) {
//     const returnArray = [];
//     for(let item of array) {
//         const projectedArray = projection(item);
//         for(let projected of projectedArray) {
//             returnArray.push(projected);
//         }
//         return returnArray;
//     }
// }

// const albums = [
//     {title: 'Album 1', tracks: [{id:1, title: 'Track 1'}, {id: 2, title: 'Track 1'}]},
//     {title: 'Album 2', tracks: [{id:1, title: 'Track 2'}, {id: 2, title: 'Track 3'}]}
// ]

// const tracksWrong = arrayMap(albums, album => album.tracks);
// const tracksRight = arrayMergeMap(albums, album => album.tracks);

// console.log(JSON.stringify(tracksRight));


// Returning another observable, being merged in a stream
// Doing a merge and map operation


_Rx2.default.Observable.range(1, 3).mergeMap(function (i) {
    return _Rx2.default.Observable.timer(i * 2000).map(function () {
        return 'After ' + i * 2 + ' Seconds';
    });
}).subscribe((0, _util.createSubscriber)('Showcasing the mergeMap operator'));

_Rx2.default.Observable.fromPromise(getTracks()).mergeMap(function (track) {
    return _Rx2.default.Observable.from(track);
}).subscribe((0, _util.createSubscriber)('Promise with mergeMap operator'));

function getTracks() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(['track 1', 'track 2', 'track 3']);
        }, 1000);
    });
}

// SwitchMap only handles the latest value
// Very important in user interfaces
// See rx autocomplete example