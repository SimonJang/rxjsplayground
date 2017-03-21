import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';


Rx.Observable.interval(1000)
    .merge(Rx.Observable.interval(500))
    .take(5)
    .subscribe(createSubscriber('Showcasing merge operator'));


Rx.Observable.merge(
    Rx.Observable.interval(1000).map(i => `${i} seconds`),
    Rx.Observable.interval(500).map(i => `${i} seconds`)
)
    .take(10)
    .subscribe(createSubscriber('Another example of the merge operator'))


Rx.Observable.concat(
    Rx.Observable.interval(1000).map(i => `${i} seconds`).take(3),
    Rx.Observable.interval(500).map(i => `${i} seconds`).take(3)
)
    .subscribe(createSubscriber('Showcasing concat operator'))