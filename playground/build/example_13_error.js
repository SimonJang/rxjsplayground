'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Rx2.default.Observable.concat(_Rx2.default.Observable.of(42), _Rx2.default.Observable.throw('Some error'), _Rx2.default.Observable.of(10)).subscribe((0, _util.createSubscriber)('Showing exception handling'));

_Rx2.default.Observable.fromPromise(getApi()).retry(3) // Retry when error x amount of times, only works on a cold observable
.catch(function (error) {
    return _Rx2.default.Observable.of(error);
}) // Catching the error
.do(function () {
    return console.log('Exception handling');
}).subscribe((0, _util.createSubscriber)('Handling an exception'));

function getApi() {
    console.log('Getting API');
    return new _Rx2.default.Observable(function (observer) {
        console.log('Getting API');
        setTimeout(function () {
            observer.error(new Error());
        }, 1000);
    });
}