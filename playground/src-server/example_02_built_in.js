import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

const testArray = ['test', 'test2', 'test3'];

// 0.5s interval, 5 times

Rx.Observable.interval(500)
    .take(5)
    .subscribe(createSubscriber('interval'));


// Returns a single value

Rx.Observable.of('Hello world')
    .subscribe(createSubscriber('hello world'));


// Loops through the array, converts an array into a stream of arrays

Rx.Observable.from(testArray)
    .subscribe(createSubscriber('Array with from test'));


// Returns the whole array

Rx.Observable.of(testArray)
    .subscribe(createSubscriber('Array with of test'))


// Throw an error, stops the sequence when an error is thrown
// doesn't work with 'from' and 'of'

Rx.Observable.throw(new Error('A test error'))
    .subscribe(createSubscriber('Error'))


// Empty, doesn't show anything but outputs only completes

Rx.Observable.empty()
    .subscribe(createSubscriber('Empty example'))


// Defer: Works as a close that can generate a value

let sideeffect = 0;
const defer$ = Rx.Observable.defer(() => {
    sideeffect++;
    return Rx.Observable.of(sideeffect);
})

defer$.subscribe(createSubscriber('Defer 1'));
defer$.subscribe(createSubscriber('Defer 2'));


// Never, doesn't output no items, never completes

Rx.Observable.never()
    .subscribe(createSubscriber('Never'));


// Range, start number and a total count

Rx.Observable.range(10,5)
    .subscribe(createSubscriber('Value 10, 5 times starting from 10'));