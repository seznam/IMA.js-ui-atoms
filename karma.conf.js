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
			'./dist/*.js',
			'./dist/**/*Spec.js'
		],
		preprocessors: {
			'./dist/**/*.js': ['browserify'],
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
			transform: [
				['babelify', { presets: ["es2015", "react"] }]
			]
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
