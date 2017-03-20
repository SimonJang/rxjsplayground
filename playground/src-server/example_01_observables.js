import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

// A promise is eager, not lazy
const promise = new Promise((resolve, reject) => {
    console.log("In Promise");
    resolve("hey")
})

// An observable is lazy
const simple$ = new Rx.Observable(observer => {
    console.log('generating observable');
    setTimeout(() => {
        observer.next("an item");
        setTimeout(() => {
            observer.next("Another item");
            observer.complete();
        }, 1000);
    }, 1000);
});

const error$ = new Rx.Observable(observer => {
    observer.error(new Error('This is broke'))
})

// Korte manier, generator function
simple$.subscribe(
    s => console.log(`One.next ${s}`),      // next
    error => console.log(`one.error ${s}`), // error
    () => console.log("one.complete")       // complete
)

// Langere manier, generator function
setTimeout(() => {
    simple$.subscribe({
        next: item => console.log('alternative next statement'),
        error(error) {
            console.log(error);
        },
        complete: function() {
            console.log('two complete')
        }
    });
}, 3000); 


// Maakt een array achtige output
function createInterval$(time) {
    return new Rx.Observable(observer => {
        let index;
        setInterval(() => {
            observer.next(index++);
            console.log('Generating index');
        }, time);

        return () => {
            clearInterval(time);
        }
    })
}

const everySecond$ = createInterval$(1000);
const subscription = everySecond$.subscribe(createInterval$('one'));

setTimeout(() => {
    subscription.unsubscribe();
}, 3000);


// Operators are nothing then wrappers around observables
// There are better ways of implementing then below
function take(observable, amount) {
    return new Rx.Observable(observer => {
        let count = 0;
        const subscription = observable.subscribe({
            next(item) {
                observer.next(item);
                if(++count >= amount)
                    observer.complete();
            },
            error(error) { observer.error(error) },
            complete() { observer.complete(); }
        })
        return () => subscription.unsubscribe();
    });
}

// Test
const firstFiveSeconds$ = take(everySecond$, 5);