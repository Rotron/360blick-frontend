var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    inject = require('gulp-inject'),
    open = require ('gulp-open'),
    webserver = require('gulp-webserver'),
    clean = require('gulp-clean'),
    angularFilesort = require('gulp-angular-filesort'),
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
            fallback: 'index.html'
        }));
});



//// Open Task (starts app automatically)
//gulp.task("open", function(){
//    var options = {
//        url: "http://localhost:8080",
//        app: "Chrome"
//    };
//    gulp.src("app/index.html")
//        .pipe(open("", options));
//});


// Styles
gulp.task('sass', function() {
    return gulp.src('app/sass/main.scss')
        .pipe(sass({
            loadPath: [
                    './app/bower_components/singularity/stylesheets'
                ]
            }
        ))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['inject', 'sass']);
gulp.task('serve', ['webserver', 'watch']);
