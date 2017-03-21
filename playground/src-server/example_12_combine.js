import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

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

Rx.Observable.range(1, 10)
    .zip(Rx.Observable.interval(500), (left,right) => `item: ${left}, at ${right * 500}`)
    .subscribe(createSubscriber('Showcasing zip operator'))

Rx.Observable.interval(1000)
    .withLatestFrom(Rx.Observable.interval(500))
    .subscribe(createSubscriber('Showcasing withLatestFrom operator'))

