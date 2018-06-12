let del = require('del');
let gulp = require('gulp');
let babel = require('gulp-babel');
let rename = require('gulp-rename');
let path = require('path');
let browserify = require('browserify');
let babelify = require('babelify');
let watchify = require('watchify');
let fs = require('fs');
let cache = require('gulp-cached');
let remember = require('gulp-remember');
let gulpLess = require('gulp-less');
let b = null;

let gulpConfig = {
	onTerminate() {
		setTimeout(() => process.exit());
	}
};

exports.build = gulp.series(
	clean,
	compile
);
exports.copy = copy;

function compile() {
	return gulp
		.src('./src/**/*.{js,jsx}')
		.pipe(cache('compile'))
		.pipe(babel({
			moduleIds: true,
			presets: ['react'],
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(remember('compile'))
		.pipe(rename((path) => {
			path.extname = '.js';
		}))
		.pipe(gulp.dest('./dist'));
}

function bundle() {
	if (!b) {
		b = createBrowserifyInstance();
	}

	return b.bundle()
    .on('error', function(err){
      // print the error (can replace with gulp-util)
      console.log(err.message);
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

	return (
		browserify(['./example/main.js'], options)
			.transform(babelify.configure({
				presets: ['react'],
				plugins: ['transform-es2015-modules-commonjs']
			}))
			.plugin([watchify])
	);
}

function less() {
	return gulp
		.src('./src/**/*.less')
		.pipe(gulpLess({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest('./example/dist/'));
}

function copy() {
	return gulp
		.src(['./src/**/*.less', './package.json', './README.md'])
		.pipe(gulp.dest('./dist'));
}

function clean() {
	return del(['./dist']);
}

exports['dev'] = gulp.series(
	compile,
	less,
	bundle,
	dev
);
function dev(done) {
	gulp.watch('./src/**/*.less', less);
	gulp.watch('example/**/*.js', {
		ignored: 'example/dist/*'
	}, bundle);
	gulp.watch('./src/**/*.{js,jsx}', gulp.series(compile, bundle));
}

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
