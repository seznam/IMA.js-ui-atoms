require('babel-core/register.js')({
	presets: [require('babel-preset-es2015'), require('babel-preset-react')]
});

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
let less = require('gulp-less');


let gulpConfig = {
	onTerminate: () => {
		setTimeout(() => {
			process.exit();
		});
	}
};

function startKarmaServer(done, singleRun) {
	new karma.Server({
		configFile: path.resolve('./karma.conf.js'),
		singleRun: singleRun
	}, done).start();
}

// build module
gulp.task('build', () => {
	return (
		gulp.src('./src/**/*.{js,jsx}')
		.pipe(cache('build'))
		.pipe(babel({
			moduleIds: true,
			presets: ['react'],
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(remember('Es6ToEs5:ima'))
		.pipe(rename((path) => {
			path.extname = '.js';
		}))
		.pipe(gulp.dest('./dist'))
	);
});


gulp.task('bundle', function() {
	var options = { debug: false, insertGlobals : false, basedir: './example/' };

	return (
		browserify(['main.js'], options)
			.transform(babelify.configure({
				presets: ['es2015', 'react']
			}))
			.bundle()
			.pipe(fs.createWriteStream('./example/dist/bundle.js'))
	);
});

gulp.task('less', function() {
	return (
		gulp.src('./src/**/*.less')
			.pipe(less({
				paths: [path.join(__dirname, 'less', 'includes')]
			}))
			.pipe(gulp.dest('./example/dist/'))
	);
});

gulp.task('copy', function() {
	return (
		gulp.src('./src/**/*.less')
			.pipe(gulp.dest('./dist'))
	);
});

gulp.task('test', function(done) {
	startKarmaServer(done, true);
});

// -------------------------------------PRIVATE HELPER TASKS
gulp.task('dev', ['build', 'bundle', 'less'], (done) => {
	startKarmaServer(done);

	gulp.watch('./src/**/*.less', ['less']);
	gulp.watch(['./src/**/*.{js,jsx}', './example/**/*.{js,jsx}'], ['build', 'bundle']);
});

gulp.task('dev:dist', ['build'], (done) => {
	startKarmaServer(done);

	gulp.watch('./src/**/*.{js,jsx}', ['build']);
});

gulp.task('dev:example', ['build', 'bundle', 'less'], (done) => {
	startKarmaServer(done);

	gulp.watch('./src/**/*.less', ['less']);
	gulp.watch('./example/**/*.{js,jsx}', ['bundle']);
});

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
