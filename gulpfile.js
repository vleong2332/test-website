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

gulp.task('build', function() {
  return client.getEntries({ limit: 1000 }).then(function(entries) {
    return gulp.src('src/**/*.html')
      .pipe(mustache({
        meetups: getMeetups(entries)
      }))
      .pipe(gulp.dest('public'));
  });
});

gulp.task('show-entries', function() {
  return client.getEntries({ limit: 1000 }).then(function(entries) {
    console.log(JSON.stringify(entries, null, 2));
  });
});

gulp.task('default', ['clean', 'build']);


function getMeetups(entries) {
  return entries.items.filter(function(item) {
    return item.sys.contentType.sys.id == 'meetup';
  })
  .map(function(meetup) {
    return {
      id: meetup.sys.id,
      name: meetup.fields.name,
      city: meetup.fields.city,
      organizers: meetup.fields.organizers.map(function(person) {
        return {
          name: person.fields.name,
          email: person.fields.email
        };
      }),
      members: meetup.fields.members.map(function(person) {
        return {
          name: person.fields.name,
          email: person.fields.email
        };
      })
    }
  });
}
