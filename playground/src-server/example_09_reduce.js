import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// Reduce logic

function arrayReduce(array, accumulator, startValue) {
    let value = startValue;
    for(let item of array) {
        value = accumulator(value, item);
    }

    return value;
}

const values = [1,2,3,4,5,6,7,8,9,10];
const sum = arrayReduce(values, (acc, i) => acc + i, 0);
console.log(sum);


Rx.Observable.range(1, 10)
    .reduce((acc, value) => acc + value) // Reduce needs to finish to output a value, can be a problem with hot observables
    .subscribe(createSubscriber('Showcasing the reduce operator'));

Rx.Observable.range(1, 10)
    .merge(Rx.Observable.never()) // Doesn't work on reduce, since reduce needs to complete to output a value
    .scan((acc, value) => acc + value) // Scan is like reduce, but works on a hot observable, because it never needs to complete
    .subscribe(createSubscriber('Showcasing the scan operator'));

Rx.Observable.range(1, 10)
    .map(i => i * i)
    .scan(([last], current) => [current, last], [])
    .subscribe(createSubscriber('Another example of the scan operator'))

