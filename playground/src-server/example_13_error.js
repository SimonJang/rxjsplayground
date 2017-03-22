import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

Rx.Observable.concat(
    Rx.Observable.of(42),
    Rx.Observable.throw('Some error'),
    Rx.Observable.of(10)
)
    .subscribe(createSubscriber('Showing exception handling'));


Rx.Observable.fromPromise(getApi())
    .retry(3) // Retry when error x amount of times, only works on a cold observable
    .catch(error => Rx.Observable.of(error)) // Catching the error
    .do(() => console.log('Exception handling'))
    .subscribe(createSubscriber('Handling an exception'))


function getApi() {
    console.log('Getting API');
    return new Rx.Observable(observer => {
        console.log('Getting API');
        setTimeout(() => {
            observer.error(new Error())
        },1000)
    })
}