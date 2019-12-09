import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve'; // 使用第三方模块
import commonjs from 'rollup-plugin-commonjs'; // 将CommonJs模块转换成ES2015
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/main.ts',
  output: {
    name: 'jssdk',
    file: 'lib/jssdk.js',
    format: 'umd'
  },
  plugins: [
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve({ extensions }),
    commonjs({ extensions }),
    eslint(),
    terser()
  ],
  external: []
};
