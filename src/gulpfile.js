var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();


//Kompilacja jade do html
gulp.task('jade', function(){
  gulp
  .src('_jade/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./'));
});


// Kompilacja SASS do CSS + Autoprefixer + minifikacja
gulp.task('sass', function () {
  return gulp.src('./_sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css'));
});


// Urcuhominienie serwera + watch na zmiana sass i html

gulp.task('server', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("/_sass/**/*.sass", ['sass']);
    gulp.watch("_jade/*.jade", ['jade']);
    gulp.watch("/").on('change', browserSync.reload);
});

gulp.task('default', ['server']);
