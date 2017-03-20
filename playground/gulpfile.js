// ES2015 code is being transpiled in build folder
// This gulp files checks files changes in src-client or src-server and compiles code in the build folders

// gulp watch:scripts:server
// automatic compiles from ES2015 to JavaScript

// Server Side
// npm run nodemon build/example_00.js
//         - package.json moet aangepast worden
//         - node server uitvoeren
//         - fast feedback loop

// Client side is being handled by live-server
// With live-server can you easily see updates made in HTML and JS

// Setup
// gulp watch:scripts
// live-server in public folder

'use strict'

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    path = require('path'),
    fs = require('fs'),
    babelify = require('babelify');

gulp.task('scripts:server', () => {
    return gulp.src('./src-server/**/*.js')
        .pipe($.cached('server'))
        .pipe($.babel())
        .pipe(gulp.dest('./build'));
})

gulp.task('watch:scripts:server', gulp.series(
    'scripts:server', () => {
        return gulp.watch('./src-server/**/*.js', gulp.series('scripts:server'));
    }
));

// Converteert de files automatisch naar correcte

gulp.task('watch:scripts:clients', () => {
    const files = fs.readdirSync('./src-client');
    for(let i = 0; i < files.length; i++) {
        const file = files[i];
        if(path.extname(file) !== ".js")
            continue;

        initBundlerWatch(path.join('src-client', file));
    }
    return gulp.watch('./src-client/**/*.js')
        .on('change', initBundlerWatch);
});

gulp.task('watch:scripts', gulp.parallel(
    'watch:scripts:clients',
    'watch:scripts:server'
));

let bundlers = {};

function initBundlerWatch(file) {
    if(bundlers.hasOwnProperty(file)) {
        return;
    }

    const bundler = createBundler(file);
    bundlers[file] = bundler;

    const watcher = watchify(bundler);
    const filename = path.basename(file);

    function bundle() {
        return bundler
            .bundle()
            .on('error', error => console.error(error))
            .pipe(source(filename))
            .pipe(gulp.dest('./public/build'))
    }

    watcher.on('update', bundle) // bundle om file change
    watcher.on('time', time => console.log(`Built client in ${time} ms`))

    bundle();
}

function createBundler(file) {
    const bundler = browserify(file);
    bundler.transform(babelify);
    return bundler;
}