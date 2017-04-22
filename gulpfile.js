require('dotenv').config({silent: true});

var gulp = require('gulp');
var contentful = require('contentful');
var mustache = require('gulp-mustache');
var rimraf = require('rimraf');


gulp.task('clean', function() {
  rimraf.sync('public');
});

gulp.task('build', function() {
  return gulp.src('src/**/*')
    .pipe(mustache({
      sermons: [{
        title: "Hello, there"
      }]
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['clean', 'build']);
