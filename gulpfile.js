var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var path = require('path');
var source = require('vinyl-source-stream');
var notifier = require('node-notifier');

gulp.task('vendor:css', function () {
  var src = [
    'node_modules/react-select/dist/react-select.css'
  ];

  return gulp.src(src)
    .pipe(lp.concat('vendor.css'))
    .pipe(gulp.dest("public"));
});

gulp.task('build:css', function () {

  // pipe the target file to the
  var mainFile = ["client/app.scss"];
  var imports = [
    "!" + mainFile[0],
    'client/**/*.scss'
  ];

  return gulp.src(mainFile)
    .pipe(lp.inject(gulp.src(imports, {read: false}), {
      relative: true,
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function (filePath) {
        return '@import "' + filePath + '";';
      }
    }))
    .pipe(lp.sass())
    .pipe(lp.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(lp.minifyCss())
    .pipe(gulp.dest("public"))
    .pipe(lp.livereload());
});

gulp.task("build:js", function (done) {
  var args = watchify.args;
  args.extensions = ['.js', '.jsx'];

  watchify(browserify(path.join("./client", "main.js"), args), args)
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.error(err.message);
      notifier.notify({
        title: "tech-matrix build:css",
        message: err.message,
        icon: path.join(__dirname,'.things/icons/browserify.png')
      });
      done();
    })
    .pipe(source("app.js"))
    .pipe(gulp.dest("./public"))
    .pipe(lp.livereload()).on('end', function(){
      notifier.notify({
        title: "tech-matrix build:css",
        message: "Browserify finished",
        icon: path.join(__dirname,'.things/icons/browserify.png')
      });
      done();
    });
});

gulp.task('default', ['vendor:css', 'build:css', 'build:js'], function () {
  lp.livereload({
    start: true
  });
  gulp.watch(['client/**/*.js', 'client/**/*.jsx'], ["build:js"]);
  gulp.watch('client/**/*.css', ["build:css"]);

  lp.nodemon({
    delay: 0,
    debug: true,
    harmony: true,
    script: './server/index.js',
    stdout: false,
    ext: 'js',
    "ignore": ["node_modules", "client", "public", "gulpfile.js", ".things"]
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/tech-matrix is listening/.test(chunk)) {
        notifier.notify({
          title: "tech-matrix server",
          message: "Restarted",
          icon: path.join(__dirname,'.things/icons/nodejs.png')
        });
      }
      process.stdout.write(chunk);
    });
    this.stderr.pipe(process.stderr);
  });
});

