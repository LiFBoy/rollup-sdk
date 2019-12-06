import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

export default {
  input: 'src/main.ts',
  output: {
    name: 'jssdk',
    file: 'lib/jssdk.js',
    format: 'umd'
  },
  plugins: [typescript(), resolve(), commonjs(), eslint(), babel(), terser()]
};
