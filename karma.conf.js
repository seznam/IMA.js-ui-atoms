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
			'./src/*.{jsx, js}',
			'./src/**/*Spec.js',
			'./src/**/*Spec.jsx'
		],
		preprocessors: {
			'./src/*.{jsx, js}': ['browserify'],
			'./src/**/*Spec.js': ['browserify'],
			'./src/**/*Spec.jsx': ['browserify']
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
			//'karma-babel-preprocessor',
			'karma-jasmine',
			'karma-browserify'
		],
		autoWatch: true,
		singleRun: false,
		colors: true
	});
};
