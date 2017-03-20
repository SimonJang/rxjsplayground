'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Converting a cold observable into a hot observable

// Cold observable
var intervalCold$ = _Rx2.default.Observable.interval(1000).take(5);

// hot observable
var interval$ = _Rx2.default.Observable.interval(1000).take(5).publish();

// The subscribers are missing the first value
interval$.connect();

setTimeout(function () {
    interval$.subscribe((0, _util.createSubscriber)('one'));
}, 1200);

setTimeout(function () {
    interval$.subscribe((0, _util.createSubscriber)('two'));
}, 3200);

var socket = { on: function on() {} };

var chatMessage$ = new _Rx2.default.Observable(function (observer) {
    console.log('subscribed');
    socket.on("chat:message", function (message) {
        return observer.next(message);
    });
}).publish();

chatMessage$.connect();

chatMessage$.subscribe((0, _util.createSubscriber)('publish replay test:'));
chatMessage$.subscribe((0, _util.createSubscriber)('publish replay test v2 :'));

var simple$ = new _Rx2.default.Observable(function (observer) {
    observer.next('one');
    observer.next('two');
    observer.complete();

    return function () {
        return console.log('Disposed');
    };
});

// Refcount auto unsubscribe the last subscription
// This means the first values are only shown to the first operator

var published$ = simple$.publish().refCount(); // hot
// const published$ = simple$.share();              // hot but sharing with both subscriptions

var sub1 = published$.subscribe((0, _util.createSubscriber)('Testing refcount'));
var sub2 = published$.subscribe((0, _util.createSubscriber)('Testing refcount v2'));

sub1.unsubscribe();
sub2.unsubscribe();

// Code beneath does only work on RxJS v5

// const published$ = simple$.publishLast() // simple$.publishReplay(2) //