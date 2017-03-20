// Autocomplete non reactive version
// Too much identation, too much manipulation in the global state

import $ from 'jquery';

const $title = $('#title');
const $result = $('#results');

let lastQuery = null;
let timeOut = null;
let nextQueryId = 0;
$title.on('keyup', e => {
    const title = e.target.value;

    if(title == lastQuery) {
        return;
    }

    lastQuery = title;

    if(timeOut) {
        window.clearTimeout(timeOut);
    }
    let ourQueryId = ++nextQueryId;
    timeOut = window.setTimeout(() => {
        getItems(title)
        .then(items => {
            if(ourQueryId != nextQueryId) {
                return;
            }
            $result.empty();
            
            const $items = items.map(item => $(`<li />`).text(item));
            $result.append($items);
        });
    }, 500)

    
});

// Library dummy

function getItems(title) {
    console.log(`Querying ${title}`)
    return new Promise((resolve, error) => {
        window.setTimeout(() => {
            resolve([title, "item2", `Another ${Math.random()}`])
        }, 500 + (Math.random() * 600));
    });
}