import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// Subject is often used as a bridge between reactive and non reactive code

const simple$ = new Rx.Subject();

simple$.subscribe(createSubscriber('simple$'));

simple$.next('Hello');
simple$.next('World');
simple$.complete();


const interval$ = new Rx.Observable.interval(1000)
    .take(5);
const intervalSubject$ = new Rx.Subject()
interval$.subscribe(intervalSubject$); // Subject here is a proxy for the interval$ proxy

intervalSubject$.subscribe(createSubscriber('Subscribing on subject'));



// Kick off workflow with subjects
// To be a bridge between an Observable and other subscribers

const currentuser$ = new Rx.Subject();
const isLoggedIn$ = currentuser$.map(u => u.isLoggedIn);

isLoggedIn$.subscribe(createSubscriber('isLoggedIn'))

currentuser$.next({ isLoggedIn: false});
setTimeout(() => {
    currentuser$.next({ isLoggedIn: true, name: 'Nelson'})
},1000)



// Behaviour subject always emits a value

const currentUser$ = new Rx.BehaviorSubject({ isLoggedIn: true});
currentUser$.subscribe(createSubscriber('Testing BehaviorSubject'))



// Replay subject, doesn't always emit a value
// only is there are next() values to be displayed

const replay$ = new Rx.ReplaySubject(3);

replay$.next(1);
replay$.next(1);
replay$.next(1);
replay$.next(1);

replay$.subscribe(createSubscriber("Testing ReplaySubject"))



// Async Subject, will only emit the final item before completed

const apiCall$ = new Rx.AsyncSubject();

apiCall$.next(1);
apiCall$.complete();

apiCall$.subscribe(createSubscriber('Testing the AsyncSubject'));