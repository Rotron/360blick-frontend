var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    inject = require('gulp-inject'),
    open = require ('gulp-open'),
    webserver = require('gulp-webserver'),
    clean = require('gulp-clean'),
    //angularFilesort = require('gulp-angular-filesort'),
    gulpkss = require('gulp-kss'),
    templateCache = require('gulp-angular-templatecache'),
    rename = require("gulp-rename"),
    install = require("gulp-install"),
    bower = require('gulp-bower'),
    preprocess = require('gulp-preprocess'),
    karma = require('gulp-karma'),
    del = require('del'), //be careful!! rm -rf
    runSequence = require('run-sequence'),
    wiredep = require('wiredep').stream;

/**
 * Webserver
 */
gulp.task('webserver', function() {
    gulp.src('./app')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('webserver-build', function() {
    gulp.src('./build')
        .pipe(webserver({
            livereload: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('webserver-styleguide', function() {
    gulp.src('./styleguide')
        .pipe(webserver({
            livereload: false, // todo: clean() causes error
            port: 8080,
            open: true,
            fallback: 'index.html'
        }));
});

/**
 * Styles
 */
gulp.task('sass', function() {
    return gulp.src('app/sass/main.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('css-copy', ['sass'], function() {
    gulp.src('app/css/main.css')
        .pipe(gulp.dest('styleguide/public'));
});

/**
 * Styleguide
 */
gulp.task('watch-styleguide', function() {
    gulp.watch(['app/sass/**/*.scss', 'styleguide/template/**/*'], ['kss', 'sass', 'css-copy']);
});

gulp.task('kss', function() {
    gulp.src('./styleguide/*.html', {read: false})
        .pipe(clean());
    gulp.src(['app/sass/**/*.scss'])
        .pipe(gulpkss({
            overview: __dirname + '/styleguide/styleguide.md',
            templateDirectory: __dirname + '/styleguide/template'
        }))
        .pipe(gulp.dest('styleguide/'))
});

/**
 * Templates
 */
gulp.task('templateCache', function () {
    gulp.src('app/views/**/*.html')
        .pipe(templateCache({
            standalone: true,
            templateHeader: "'use strict';angular.module('templates', []).run(['$templateCache', function($templateCache) {",
            templateFooter: '}]);\n'
        }))
        .pipe(gulp.dest('app/js'));
});

/**
 * Install deps
 */
gulp.task('npm', function () {
    gulp.src(['./package.json'])
        .pipe(install());
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('app/bower_components'))
});

/**
 * Build process
 */

// Optimize images
gulp.task('build-images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/images'))
        .pipe($.size({title: 'images'}));
});


gulp.task('preprocess-build', ['templateCache'], function(){
    gulp.src('./app/js/**/*.js')
        .pipe(preprocess({context: { NODE_ENV: 'PRODUCTION', DEBUG: true}}))
        .pipe(gulp.dest('./app/tmp'));
});

gulp.task('clean-build-folder', function () {
    del.sync('build/**');//be careful!! rm -rf
});

gulp.task('build', function () {
    runSequence('clean-build-folder',
        'preprocess-build',
        'sass',
        'templateCache',
        'inject',
        'build-images',
        function(){
            var assets = $.useref.assets({searchPath: '{.tmp,app}'});

            /*copy files*/
            gulp.src('app/.htaccess')
                .pipe(gulp.dest('build'));

            gulp.src('app/fonts/*')
                .pipe(gulp.dest('build/fonts'));

            /*concat and minify*/
            return gulp.src('app/index.html')
                .pipe(assets)
//        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
                .pipe($.if('*.css', $.csso()))
                .pipe(assets.restore())
                .pipe($.useref())
                .pipe($.if('*.html', $.minifyHtml()))
                .pipe(gulp.dest('build'))
                .pipe($.size({title: 'html'}));
        });



});

/**
 * Inject files into index.html
 */
gulp.task('inject', ['bower', 'npm', 'preprocessor'], function() {
    gulp.src('./app/index-template.html')
        .pipe(wiredep())
        .pipe(inject(gulp.src('./app/tmp/vendor/*.js', {read: false}), {name: 'vendor', relative: true}))
        .pipe(inject(gulp.src(['./app/tmp/**/*.js', '!app/tmp/vendor{,/**}']), { relative: true }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./app/'));
});

gulp.task('clean-tmp', function () {
    del.sync('app/tmp/**');//be careful!! rm -rf
});

gulp.task('preprocessor', function(){
    gulp.src('./app/js/**/*.js')
    .pipe(preprocess())
    .pipe(gulp.dest('./app/tmp'));
});

/**
 * Testing
 */
gulp.task('test', function() {

    var testFiles = [
        '.app/test/**/*.js'
    ];

    // Be sure to return the stream
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('testLocal', function() {

    var testFiles = [
        '.app/test/**/*.js'
    ];

    // Be sure to return the stream
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karmaLocal.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

/**
 * Watcher
 */
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['inject']);
    gulp.watch('app/views/**/*.html', ['templateCache']);
});

/**
 * Multiple-Tasks
 */

gulp.task('default', ['sass', 'templateCache', 'inject']);
gulp.task('serve', function(){
    runSequence('clean-tmp',
        'sass',
        'templateCache',
        'inject',
        ['webserver', 'watch']);
});
gulp.task('serve-build', ['webserver-build']);
gulp.task('serve-styleguide', ['webserver-styleguide', 'watch-styleguide']);
gulp.task('serve-all', ['webserver', 'webserver-styleguide', 'watch', 'watch-styleguide']);
