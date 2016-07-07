require('babel-core/register.js')({
	presets: ['es2015', 'react']
});

let gulp = require('gulp');
let babel = require('gulp-babel');
let rename = require('gulp-rename');
let karma = require('karma');
let path = require('path');

let gulpConfig = {
	onTerminate: () => {
		setTimeout(() => {
			process.exit();
		});
	}
};

// build module
gulp.task('build', () => {
	return (
		gulp.src('./src/**/*.{js,jsx}')
			.pipe(babel({
				moduleIds: true,
				presets: ['react'],
				plugins: ['transform-es2015-modules-commonjs']
			}))
			.pipe(rename((path) => {
				path.extname = '.js';
			}))
			.pipe(gulp.dest('./dist'))
	);
});

gulp.task('copy', function() {
	return (
		gulp.src('./src/**/*.less')
			.pipe(gulp.dest('./dist'))
	);
});

gulp.task('test', function(done) {
	new karma.Server({
		configFile: path.resolve('./karma.conf.js'),
		singleRun: true
	}, done).start();
});


// -------------------------------------PRIVATE HELPER TASKS
gulp.task('dev', ['build'], (done) => {
	new karma.Server({
		configFile: path.resolve('./karma.conf.js')
	}, done).start();

	gulp.watch('./src/**/*.{js,jsx}', ['build']);
});

if (gulpConfig.onTerminate) {
	process.on('SIGINT', gulpConfig.onTerminate.bind(null, 'SIGINT'));
	process.on('SIGTERM', gulpConfig.onTerminate.bind(null, 'SIGTERM'));
	process.on('SIGHUP', gulpConfig.onTerminate.bind(null, 'SIGHUP'));
}
