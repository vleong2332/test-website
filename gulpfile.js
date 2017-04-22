require('dotenv').config({silent: true});

var gulp = require('gulp');
var contentful = require('contentful');
var handlebars = require('gulp-handlebars');
var rimraf = require('rimraf');


gulp.task('clean', function() {
  rimraf.sync('public');
});

gulp.task('build', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['clean', 'build']);
