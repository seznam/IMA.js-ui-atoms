module.exports = function(config) {
	config.set({
		urlRoot: '/',
		basePath: '',
		frameworks: ['browserify', 'jasmine'],
		port: 3002,
		logLevel: config.LOG_INFO,
		reporters: ['dots'],
		browsers: [
			'PhantomJS'
		],
		files: [
			'./src/*.js',
			'./src/**/*Spec.js'
		],
		preprocessors: {
			'./src/**/*.js': ['browserify'],
			'./src/**/*Spec.js': ['browserify']
		},
		babelPreprocessor: {
			options: {
				presets: ['es2015', 'react'],
				sourceMap: 'inline'
			},
			filename: function(file) {
				return file.originalPath.replace(/\.jsx$/, '.js');
			},
			sourceFileName: function(file) {
				return file.originalPath;
			}
		},
		browserify: {
			debug: true,
			paths: ['./'],
			extensions: ['.jsx'],
			transform: [
				['babelify', { presets: ["es2015", "react"] }]
			],
			configure: function(bundle) {
				bundle.on('prebundle', function() {
					bundle.external('react/addons');
					bundle.external('react/lib/ReactContext');
					bundle.external('react/lib/ExecutionEnvironment');
				});
			}
		},
		plugins: [
			'karma-phantomjs-launcher',
			'karma-babel-preprocessor',
			//'karma-renamer-preprocessor',
			'karma-jasmine',
			'karma-browserify'
		],
		autoWatch: true,
		singleRun: false,
		colors: true
	});
};
