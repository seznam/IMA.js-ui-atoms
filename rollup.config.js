import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import jscc from 'rollup-plugin-jscc';
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

function generateConfig(environemnt) {
  return {
    external: [
      'react',
      'react-dom',
      'infinite-circle',
      '@ima/helpers',
      '@ima/core',
    ],
    input: 'src/main.js',
    treeshake: {
      moduleSideEffects: 'no-external',
    },
    output: [
      {
        file: `./dist/atoms.${environemnt}.cjs.js`,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: `./dist/atoms.${environemnt}.esm.js`,
        format: 'esm',
        exports: 'named',
      },
    ],
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
      }),
      babel({
        moduleIds: true,
        presets: ['@babel/preset-react'],
      }),
      json({
        preferConst: true, // Default: false
        compact: true, // Default: false
        namedExports: true, // Default: true
      }),
      jscc({
        values: { _SERVER: environemnt === 'server' },
      }),
      peerDepsExternal(),
    ],
  };
}

const config = [generateConfig('server'), generateConfig('client')];

export default config;
