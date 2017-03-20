'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Subject is often used as a bridge between reactive and non reactive code

var simple$ = new _Rx2.default.Subject();

simple$.subscribe((0, _util.createSubscriber)('simple$'));

simple$.next('Hello');
simple$.next('World');
simple$.complete();

var interval$ = new _Rx2.default.Observable.interval(1000).take(5);
var intervalSubject$ = new _Rx2.default.Subject();
interval$.subscribe(intervalSubject$); // Subject here is a proxy for the interval$ proxy

intervalSubject$.subscribe((0, _util.createSubscriber)('Subscribing on subject'));

// Kick off workflow with subjects
// To be a bridge between an Observable and other subscribers

var currentuser$ = new _Rx2.default.Subject();
var isLoggedIn$ = currentuser$.map(function (u) {
    return u.isLoggedIn;
});

isLoggedIn$.subscribe((0, _util.createSubscriber)('isLoggedIn'));

currentuser$.next({ isLoggedIn: false });
setTimeout(function () {
    currentuser$.next({ isLoggedIn: true, name: 'Nelson' });
}, 1000);

// Behaviour subject always emits a value

var currentUser$ = new _Rx2.default.BehaviorSubject({ isLoggedIn: true });
currentUser$.subscribe((0, _util.createSubscriber)('Testing BehaviorSubject'));

// Replay subject, doesn't always emit a value
// only is there are next() values to be displayed

var replay$ = new _Rx2.default.ReplaySubject(3);

replay$.next(1);
replay$.next(1);
replay$.next(1);
replay$.next(1);

replay$.subscribe((0, _util.createSubscriber)("Testing ReplaySubject"));

// Async Subject, will only emit the final item before completed

var apiCall$ = new _Rx2.default.AsyncSubject();

apiCall$.next(1);
apiCall$.complete();

apiCall$.subscribe((0, _util.createSubscriber)('Testing the AsyncSubject'));