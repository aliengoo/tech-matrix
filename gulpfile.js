var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var path = require('path');
var source = require('vinyl-source-stream');

gulp.task('vendor:css', function () {
  var src = [
    'node_modules/react-select/dist/react-select.css'
  ];

  return gulp.src(src)
    .pipe(lp.concat('app.css'))
    .pipe(gulp.dest("public"));
});


gulp.task("build:js", function (done) {
  var args = watchify.args;
  args.extensions = ['.js', '.jsx'];

  watchify(browserify(path.join("./client", "main.js"), args), args)
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      lp.notify('Error during browserify');
      console.error(err.message);
      done();
    })
    .pipe(source("app.js"))
    .pipe(gulp.dest("./public"))
    .pipe(lp.livereload()).on('end', done);
});


gulp.task('default', ['vendor:css', 'build:js'], function () {
  lp.livereload({
    start: true
  });
  gulp.watch('./client/**', ["build:js"]);
});

