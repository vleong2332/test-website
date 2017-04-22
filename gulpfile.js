require('dotenv').config({silent: true});

var gulp = require('gulp');
var contentful = require('contentful');
var mustache = require('gulp-mustache');
var rimraf = require('rimraf');

var client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.API_TOKEN
});


gulp.task('clean', function() {
  rimraf.sync('public');
});

var ENTRIES = {
  morningSermons: '1Qy66Ai4pqiMK2gYO2MCqu'
};

gulp.task('build', function() {
  return client.getEntries({ limit: 1000 }).then(function(entries) {
    var items = entries.items;
    var morningSermons = items.find(function(item) {
      return item.sys.id == ENTRIES['morningSermons'];
    });
    var morningSermonsList = morningSermons.fields.sermons.map(function(sermon) {
      return {
        title: sermon.fields.title
      };
    });
    return gulp.src('src/**/*')
      .pipe(mustache({
        sermons: morningSermonsList
      }))
      .pipe(gulp.dest('public'));
  });
});

gulp.task('default', ['clean', 'build']);
