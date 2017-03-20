'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A promise is eager, not lazy
var promise = new Promise(function (resolve, reject) {
    console.log("In Promise");
    resolve("hey");
});

// An observable is lazy
var simple$ = new _Rx2.default.Observable(function (observer) {
    console.log('generating observable');
    setTimeout(function () {
        observer.next("an item");
        setTimeout(function () {
            observer.next("Another item");
            observer.complete();
        }, 1000);
    }, 1000);
});

var error$ = new _Rx2.default.Observable(function (observer) {
    observer.error(new Error('This is broke'));
});

// Korte manier, generator function
simple$.subscribe(function (s) {
    return console.log('One.next ' + s);
}, // next
function (error) {
    return console.log('one.error ' + s);
}, // error
function () {
    return console.log("one.complete");
} // complete
);

// Langere manier, generator function
setTimeout(function () {
    simple$.subscribe({
        next: function next(item) {
            return console.log('alternative next statement');
        },
        error: function error(_error) {
            console.log(_error);
        },

        complete: function complete() {
            console.log('two complete');
        }
    });
}, 3000);

// Maakt een array achtige output
function createInterval$(time) {
    return new _Rx2.default.Observable(function (observer) {
        var index = void 0;
        setInterval(function () {
            observer.next(index++);
            console.log('Generating index');
        }, time);

        return function () {
            clearInterval(time);
        };
    });
}

var everySecond$ = createInterval$(1000);
var subscription = everySecond$.subscribe(createInterval$('one'));

setTimeout(function () {
    subscription.unsubscribe();
}, 3000);

// Operators are nothing then wrappers around observables
// There are better ways of implementing then below
function take(observable, amount) {
    return new _Rx2.default.Observable(function (observer) {
        var count = 0;
        var subscription = observable.subscribe({
            next: function next(item) {
                observer.next(item);
                if (++count >= amount) observer.complete();
            },
            error: function error(_error2) {
                observer.error(_error2);
            },
            complete: function complete() {
                observer.complete();
            }
        });
        return function () {
            return subscription.unsubscribe();
        };
    });
}

// Test
var firstFiveSeconds$ = take(everySecond$, 5);