var gulp     = require("gulp"),
    ts       = require('gulp-typescript'),
    sass     = require('gulp-sass'),
    sassLint = require('gulp-sass-lint');
    uglify   = require("gulp-uglify"),
    plumber  = require('gulp-plumber');
    notify   = require('gulp-notify');
    mock     = require('gulp-apimocker');
    browser  = require('browser-sync').create();

gulp.task('ts', function () {
  gulp.src('src/*.ts')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(ts())
    .pipe(uglify())
    .pipe(gulp.dest('dest'));
});

gulp.task('sass', function() {
  gulp.src('src/*.scss')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('dest'));
});

gulp.task('copy', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dest'));
});

gulp.task('browser-sync', function() {
    browser.init({
        server: {
          baseDir: "dest",
          index: "index.html"
        }
    });
});

gulp.task('watch', function() {
  gulp.watch('src/*.ts', ['ts', browser.reload]);
  gulp.watch('src/*.scss', ['sass', browser.reload]);
  gulp.watch('src/*.html', ['copy', browser.reload]);
});

gulp.task('apimocker', function() {
  mock.start({
    config: 'mock/config.json',
    mockDirectory: 'mock/response'
  });
});

gulp.task('default', ['ts', 'sass', 'copy', 'apimocker', 'browser-sync', 'watch']);
gulp.task('build', ['ts', 'sass' ,'copy']);
