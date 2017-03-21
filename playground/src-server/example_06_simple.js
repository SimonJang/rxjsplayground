import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

Rx.Observable.range(1 ,10)
    .do(a => console.log(`From do operator ${a}`)) // Process the stream, creating side effects
    .map(a => a * a)
    .subscribe(createSubscriber('Showcasing map operator'));


Rx.Observable.range(1, 10)
    .finally(() => console.log('From Finally')) // Final output when the observable is completed
    .map(a => a + 10 )
    .subscribe(createSubscriber('Showcasing finally operator'))


Rx.Observable.range(1, 10)
    .filter(a => a <= 5) // Filtering the stream
    .subscribe(createSubscriber('Showcasing filter operator'))


Rx.Observable.interval(8000)
    .startWith(-1) // Start with a specific element
    .subscribe(createSubscriber('Showcasing interval operator'))



