const gulp = require('gulp');
const sass = require('gulp-sass');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const beautify = require('gulp-html-beautify');
const pkg = require('./package.json');
const browserSync = require('browser-sync').create();

// Set the banner content
const banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
        .pipe(gulp.dest('./vendor/bootstrap'));

    // ChartJS
    gulp.src([
        './node_modules/chart.js/dist/*.js'
    ])
        .pipe(gulp.dest('./vendor/chart.js'));

    // DataTables
    gulp.src([
        './node_modules/datatables.net/js/*.js',
        './node_modules/datatables.net-bs4/js/*.js',
        './node_modules/datatables.net-bs4/css/*.css'
    ])
        .pipe(gulp.dest('./vendor/datatables/'));

    // Font Awesome
    gulp.src([
        './node_modules/font-awesome/**/*',
        '!./node_modules/font-awesome/{less,less/*}',
        '!./node_modules/font-awesome/{scss,scss/*}',
        '!./node_modules/font-awesome/.*',
        '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
        .pipe(gulp.dest('./vendor/font-awesome'));

    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./vendor/jquery'));

    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
    ])
        .pipe(gulp.dest('./vendor/jquery-easing'));

    // Material Design for Bootstrap
    gulp.src([
        './node_modules/mdbootstrap/**/*'
    ])
        .pipe(gulp.dest('./vendor/mdbootstrap'));

    // snap.svg
    gulp.src([
        './node_modules/snapsvg/dist/*.js'
    ])
        .pipe(gulp.dest('./vendor/snapsvg'));
});
// Compile SCSS
gulp.task('css:compile', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'))
});
// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
    return gulp.src([
        './assets/css/*.css',
        '!./assets/css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});
// CSS
gulp.task('css', ['css:compile', 'css:minify']);
// Minify JavaScript
gulp.task('js:minify', function () {
    return gulp.src([
        './assets/js/*.js',
        '!./assets/js/*.min.js'
    ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});
// JS
gulp.task('js', ['js:minify']);
// PUG
gulp.task('pug', function buildHTML() {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(beautify())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
// Default task
gulp.task('default', ['css', 'js', 'vendor']);
// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Dev task
gulp.task('dev', ['css', 'js', 'pug', 'browserSync'], function () {
    gulp.watch('./src/pug/**/*', ['pug']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./assets/js/*.js', ['js']);
    gulp.watch('./*.html', browserSync.reload);
});

// Dev demo
gulp.task('dev', ['css', 'pug', 'browserSync'], function () {
    gulp.watch('./src/pug/**/*', ['pug']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./assets/js/*.js', ['js']);
    gulp.watch('./*.html', browserSync.reload);
});


// rebuild mdbootstrap color theme
gulp.task('rebuildmdb', function () {
    return gulp.src('./vendor/mdbootstrap/scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./vendor/mdbootstrap//css'))
});

// no browser sync
gulp.task('watch', ['css', 'pug'], function () {
    gulp.watch('./src/pug/**/*', ['pug']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
   // gulp.watch('./assets/js/*.js', ['js']);
});