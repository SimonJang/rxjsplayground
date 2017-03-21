'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reduce logic

function arrayReduce(array, accumulator, startValue) {
    var value = startValue;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            value = accumulator(value, item);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return value;
}

var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var sum = arrayReduce(values, function (acc, i) {
    return acc + i;
}, 0);
console.log(sum);

_Rx2.default.Observable.range(1, 10).reduce(function (acc, value) {
    return acc + value;
}) // Reduce needs to finish to output a value, can be a problem with hot observables
.subscribe((0, _util.createSubscriber)('Showcasing the reduce operator'));

_Rx2.default.Observable.range(1, 10).merge(_Rx2.default.Observable.never()) // Doesn't work on reduce, since reduce needs to complete to output a value
.scan(function (acc, value) {
    return acc + value;
}) // Scan is like reduce, but works on a hot observable, because it never needs to complete
.subscribe((0, _util.createSubscriber)('Showcasing the scan operator'));

_Rx2.default.Observable.range(1, 10).map(function (i) {
    return i * i;
}).scan(function (_ref, current) {
    var _ref2 = _slicedToArray(_ref, 1),
        last = _ref2[0];

    return [current, last];
}, []).subscribe((0, _util.createSubscriber)('Another example of the scan operator'));