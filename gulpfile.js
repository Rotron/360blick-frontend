var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    inject = require('gulp-inject'),
    open = require ('gulp-open'),
    webserver = require('gulp-webserver'),
    clean = require('gulp-clean'),
    karma = require('gulp-karma'),
    gulpkss = require('gulp-kss');


gulp.task('styleguide', function() {
    // Watch .scss filesg
    gulp.src('./styleguide/*.html', {read: false})
        .pipe(clean());
    gulp.src(['app/sass/**/*.scss'])
        .pipe(gulpkss({
            overview: __dirname + '/styleguide/styleguide.md',
            templateDirectory: __dirname + '/styleguide/template'
        }))
        .pipe(gulp.dest('styleguide/'))
});

gulp.task('inject', function() {
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src('./app/js/**/*.js'), {relative: true}))
        .pipe(gulp.dest('./app'));
});

gulp.task('webserver', function() {
    gulp.src('./app')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});



var testFiles = [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-mocks/angular-mocks.js',
    'app/bower_components/angular-resource/angular-resource.js',
    'app/bower_components/angular-cookies/angular-cookies.js',
    'app/bower_components/angular-sanitize/angular-sanitize.js',
    'app/bower_components/angular-ui-router/release/angular-ui-router.js',
    'app/js/*.js',
    'app/js/**/*.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
];

gulp.task('test', function() {
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


// Styles
gulp.task('sass', function() {
    return gulp.src('app/scss/default.scss')
        .pipe(plumber())
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function() {
    // Watch .scss filesg
    gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('sass', ['sass']);

gulp.task('default', ['inject', 'sass']);
