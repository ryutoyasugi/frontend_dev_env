var gulp = require('gulp');

gulp.task('hello', function() {
  console.log('Hello!');
});
 
gulp.task('default', ['hello']);
