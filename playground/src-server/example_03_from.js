import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
import fs from 'fs';

fs.readdir("./src-server", (err, items) => {
    if(err) console.log(err);
    else {
        console.log(items);
    }
});

// Binds to a function
// Not an pure  Observable

const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);

readdir$('./src-server')
    .mergeMap(files => Rx.Observable.from(files))
    .map(file => `MANIPULATED ${file}`)
    .subscribe(createSubscriber('readdir'));


function getItem() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello');
        }, 1000);
    });
}

// From another promise to observable

Rx.Observable.fromPromise(getItem())
    .subscribe(createSubscriber('promise to observable'));