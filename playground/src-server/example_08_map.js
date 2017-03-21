import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';


// Map just transforms
// Equal to select in SQL/LINQ

Rx.Observable.interval(1000)
    .take(3)
    .map(a => a * a)
    .subscribe(createSubscriber('Showcasing map operator'));


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


Rx.Observable.range(1, 3)
    .mergeMap(i => Rx.Observable.timer(i * 2000).map(() => `After ${i * 2} Seconds`))
    .subscribe(createSubscriber('Showcasing the mergeMap operator'));

Rx.Observable.fromPromise(getTracks())
    .mergeMap(track => Rx.Observable.from(track))
    .subscribe(createSubscriber('Promise with mergeMap operator'));

function getTracks() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['track 1', 'track 2', 'track 3'])
        }, 1000);
    });
}


// SwitchMap only handles the latest value
// Very important in user interfaces
// See rx autocomplete example