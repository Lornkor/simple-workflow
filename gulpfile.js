var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// Browser definitions for autoprefixer
var browers = [
  'last 3 versions',
  'ie >= 9',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('default', function() {
  // place code for your default task here

});

// Test Hello
gulp.task('hello', function() {
  console.log('Hello World');
});

// browsersync
gulp.task('browsersync-reload', function () {
    browserSync.reload();
});

// Sass
gulp.task('sass', function(){
  return gulp.src('sass/styles.scss')
  .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: browers,
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cssnano())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css/'))
  .pipe(notify({ message: 'Sass task complete' }));
});
gulp.task('sass-watch', ['sass'], function(done) {
	browserSync.reload();
	done();
});


// Watch
gulp.task('watch', function (){

  browserSync.init({
    proxy: 'http://localhost/workflow-test',
    port: 3000,
    ghostMode: {
      clicks: false,
      scroll: false,
      forms: false
    }
  });


  gulp.watch('sass/**/*.scss', ['sass-watch']);
  gulp.watch('*.+(html|php)', ['browsersync-reload']);

});
