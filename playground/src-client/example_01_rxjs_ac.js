import $ from 'jquery';
import Rx from 'rxjs/Rx'; // importing the rxjs/library

const $title = $('#title');
const $result = $('#results');

// Template for future examples in the course
// fromEvent works multiple events, depending on element type, it will initiate the correct event handler

Rx.Observable.fromEvent($title, 'keyup')
    .map(e => e.target.value)
    .distinctUntilChanged()
    .debounceTime(500)
    .switchMap(getItems)
    .take(10) // Can avoid a memory leaks, unsubscribes after 10 items
    .subscribe(items => {
        $result.empty();
        $result.append(items.map(i => $(`<li />`).text(i)));
    });

// const keyups$ = Rx.Observable
//     .fromEvent($title, 'keyup');

// const queries$ = keyups$
//     .map(e => e.target.value)
//     .distinctUntilChanged()
//     .debounceTime(250)
//     .switchMap(getItems);

// queries$.subscribe(items => {
//     $result.empty();
//     $result.append(items.map(r => $(`<li />`).text(r)));
// });

// Library dummy
// For dummy data

function getItems(title) {
    console.log(`Querying ${title}`)
    return new Promise((resolve, error) => {
        window.setTimeout(() => {
            resolve([title, "item2", `Another ${Math.random()}`])
        }, 500 + (Math.random() * 600));
    });
}