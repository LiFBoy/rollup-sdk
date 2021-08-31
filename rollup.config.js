import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve'; // 使用第三方模块
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJs模块转换成ES2015
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
// import builtins from 'rollup-plugin-node-builtins';
// import globals from 'rollup-plugin-node-globals';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];

export default {
  input: 'src/main.ts',
  output: {
    name: 'jssdk',
    file: 'lib/jssdk.js',
    format: 'umd',
    // globals: {
    //   stream: 'stream',
    //   window: 'window',
    //   http: 'http',
    //   url: 'url',
    //   https: 'https',
    //   zlib: 'zlib',
    // },
    // banner: global,
  },
  plugins: [
    resolve({
      extensions,
      preferBuiltins: true,
      browser: true,
    }),
    commonjs(),
    // nodePolyfills(),
    // globals(),
    // builtins(),
    eslint({
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    terser(),
    json(),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: ['node_modules/**'],
      runtimeHelpers: true,
    }),
  ],
  // external: [
  //   'http',
  //   'https',
  //   'url',
  //   'assert',
  //   'stream',
  //   'tty',
  //   'util',
  //   'os',
  //   'zlib',
  // ],
};
