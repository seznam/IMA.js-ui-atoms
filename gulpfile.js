require('babel-core/register.js')({
	presets: [require('babel-preset-es2015'), require('babel-preset-react')]
});

let del = require('del');
let gulp = require('gulp');
let babel = require('gulp-babel');
let rename = require('gulp-rename');
let karma = require('karma');
let path = require('path');
let browserify = require('browserify');
let babelify = require('babelify');
let fs = require('fs');
let cache = require('gulp-cached');
let remember = require('gulp-remember');
let gulpLess = require('gulp-less');

let gulpConfig = {
	onTerminate() {
		setTimeout(() => process.exit());
	}
};

exports.build = gulp.series(
	clean,
	gulp.parallel(
		compile,
		copy
	)
);

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
	let options = {
		debug: false,
		insertGlobals: false,
		paths: ['./', './src'],
		extensions: ['.jsx']
	};

	return (
		browserify(['./example/main.js'], options)
			.transform(babelify.configure({
				presets: ['es2015', 'react']
			}))
			.bundle()
			.pipe(fs.createWriteStream('./example/dist/bundle.js'))
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

exports.test = test;
function test(done) {
	startKarmaServer(done, true);
}

function startKarmaServer(done, singleRun) {
	new karma.Server({
		configFile: path.resolve('./karma.conf.js'),
		singleRun: singleRun
	}, done).start();
}

exports.dev = gulp.series(
	compile,
	less,
	bundle,
	dev
);
function dev(done) {
	startKarmaServer(done);
}

exports['dev:example'] = gulp.series(
	compile,
	less,
	bundle,
	devExample
);
function devExample(done) {
	startKarmaServer(done);

	gulp.watch('./src/**/*.less', less);
	gulp.watch(['./example/**/*.{js,jsx}', '!./example/dist/*.{js,css}'], bundle);
	gulp.watch('./src/**/*.{js,jsx}', compile);
}

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
