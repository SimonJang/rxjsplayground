import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// Converting a cold observable into a hot observable

// Cold observable
const intervalCold$ = Rx.Observable.interval(1000)
    .take(5)

// hot observable
const interval$ = Rx.Observable.interval(1000)
    .take(5)
    .publish();

// The subscribers are missing the first value
interval$.connect();


setTimeout(() => {
    interval$.subscribe(createSubscriber('one'))
}, 1200);

setTimeout(() => {
    interval$.subscribe(createSubscriber('two'))
}, 3200)

const socket = {on: () => {}};

const chatMessage$ = new Rx.Observable(observer => {
    console.log('subscribed');
    socket.on("chat:message", message => observer.next(message));
}).publish();

chatMessage$.connect();

chatMessage$.subscribe(createSubscriber('publish replay test:'));
chatMessage$.subscribe(createSubscriber('publish replay test v2 :'));


const simple$ = new Rx.Observable(observer => {
    observer.next('one');
    observer.next('two');
    observer.complete();

    return () => console.log('Disposed')
});


// Refcount auto unsubscribe the last subscription
// This means the first values are only shown to the first operator

const published$ = simple$.publish().refCount();    // hot
// const published$ = simple$.share();              // hot but sharing with both subscriptions

const sub1 = published$.subscribe(createSubscriber('Testing refcount'));
const sub2 = published$.subscribe(createSubscriber('Testing refcount v2'));

sub1.unsubscribe();
sub2.unsubscribe();

// Code beneath does only work on RxJS v5

// const published$ = simple$.publishLast() // simple$.publishReplay(2) //