var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    inject = require('gulp-inject'),
    open = require ('gulp-open'),
    webserver = require('gulp-webserver'),
    clean = require('gulp-clean'),
    angularFilesort = require('gulp-angular-filesort'),
    gulpkss = require('gulp-kss');

gulp.task('inject', function() {
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src('./app/js/**/*.js'), {relative: true}))
        .pipe(gulp.dest('./app'));
});

/**
 * Webserver
 */
gulp.task('webserver', function() {
    gulp.src('./app')
        .pipe(webserver({
            livereload: true,
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
 **/
gulp.task('sass', function() {
    return gulp.src('app/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
});

/**
 * Styleguide
 **/
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

gulp.task('css-copy', ['sass'], function() {
    gulp.src('app/css/main.css')
        .pipe(gulp.dest('styleguide/public'));
});

/**
 * Multiple-Tasks
 */
gulp.task('default', ['inject', 'sass']);
gulp.task('serve', ['webserver', 'watch']);
gulp.task('serve-styleguide', ['webserver-styleguide', 'watch-styleguide']);
gulp.task('serve-all', ['webserver', 'webserver-styleguide', 'watch', 'watch-styleguide']);
