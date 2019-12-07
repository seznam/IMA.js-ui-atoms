let gulp = require('gulp');
let path = require('path');
let browserify = require('browserify');
let babelify = require('babelify');
let watchify = require('watchify');
let fs = require('fs');
let gulpLess = require('gulp-less');
let b = null;

let gulpConfig = {
  onTerminate() {
    setTimeout(() => process.exit());
  }
};

exports.copy = copy;

function bundle() {
  if (!b) {
    b = createBrowserifyInstance();
  }

  return b
    .bundle()
    .on('error', function(err) {
      // print the error (can replace with gulp-util)
      console.error(err);
      // end this stream
      this.emit('end');
    })
    .pipe(fs.createWriteStream('./example/dist/bundle.js'));
}

function createBrowserifyInstance() {
  let options = {
    debug: true,
    insertGlobals: false,
    paths: ['./', './src'],
    extensions: ['.jsx'],
    cache: {},
    packageCache: {}
  };

  return browserify(['./example/main.js'], options)
    .transform(
      babelify.configure({
        presets: ['@babel/preset-react'],
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .plugin([watchify]);
}

function less() {
  return gulp
    .src('./src/**/*.less')
    .pipe(
      gulpLess({
        paths: [path.join(__dirname, 'less', 'includes')]
      })
    )
    .pipe(gulp.dest('./example/dist/'));
}

function copy() {
  return gulp.src(['./src/**/*.less']).pipe(gulp.dest('./dist'));
}

exports['dev'] = gulp.series(less, bundle, dev);
function dev() {
  gulp.watch('./src/**/*.less', less);
  gulp.watch(
    'example/**/*.js',
    {
      ignored: 'example/dist/*'
    },
    bundle
  );
  gulp.watch('./src/**/*.{js,jsx}', gulp.series(bundle));
}

if (gulpConfig.onTerminate) {
  process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
  process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
  process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
