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
    wiredep = require('wiredep').stream;

/**
 * Webserver
 */
gulp.task('webserver', function() {
    gulp.src('./app')
        .pipe(webserver({
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
            standalone: true
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

gulp.task('build', ['default', 'build-images'], function () {
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});
    /*copy files*/
    gulp.src('app/.htaccess')
    .pipe(gulp.dest('build'));
    gulp.src('app/fonts/*')
    .pipe(gulp.dest('build/fonts'));
    /*concat and minify*/
    return gulp.src('app/index.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml())) //TODO: comment in
        .pipe(gulp.dest('build'))
        .pipe($.size({title: 'html'}));

});

/**
 * Inject files into index.html
 */
gulp.task('inject', ['bower', 'npm'], function() {
    gulp.src('./app/index-template.html')
        .pipe(wiredep())
        .pipe(inject(gulp.src('./app/js/**/*.js'), {relative: true}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./app/'));
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
gulp.task('serve', ['webserver', 'watch']);
gulp.task('serve-build', ['webserver-build']);
gulp.task('serve-styleguide', ['webserver-styleguide', 'watch-styleguide']);
gulp.task('serve-all', ['webserver', 'webserver-styleguide', 'watch', 'watch-styleguide']);
