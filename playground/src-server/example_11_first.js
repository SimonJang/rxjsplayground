import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

const simple$ = new Rx.Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.complete();
});

// Only processes the first element
simple$.first()
    .subscribe(createSubscriber('Showcasing the first operator'));

// Only processes the last element
simple$.last()
    .subscribe(createSubscriber('Showcasing the last operator'));

// Can only process a single observable
simple$.single()
    .subscribe(createSubscriber('Showcasing the single operator'));

// Processing x amount of elements, depending on take argument
simple$.take(2)
    .subscribe(createSubscriber('Showcasing the take operator'));

// Processing last x amount of elements, depdning on skip argument
simple$.skip(2)
    .subscribe(createSubscriber('Showcasing the skip operator'));

Rx.Observable.interval(500)
    .skipWhile(i => i < 4)
    .takeWhile(i => i < 10)
    .subscribe(createSubscriber('Showcasing skipWhile and takeWile operators'))

Rx.Observable.interval(500)
    .skipUntil(Rx.Observable.timer(2000))
    .takeUntil(Rx.Observable.timer(4000))
    .subscribe(createSubscriber('Showcasing the skipUntil operator'))
