const babel = require('@babel/core');
//let jestPreset = require('babel-preset-jest');

module.exports = {
  process: function (src, filename) {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
      return babel.transform(src, {
        filename,
        presets: ['@babel/preset-react'],
        plugins: ['@babel/plugin-transform-modules-commonjs'],
        retainLines: true,
      }).code;
    }

    return src;
  },
};
