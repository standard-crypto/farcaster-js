import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
    ...packageJson.devDependencies,
};

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs', // commonJS
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm', // ES Modules
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        json(),
        resolve(),
        commonjs(),
        copy({
            targets: [
                { src: 'src/contracts/*.d.ts', dest: 'dist/contracts/' }
            ]
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                exclude: ['./examples/**', './tests/**'],
            },
        }),
        commonjs({
            exclude: 'node_modules',
            ignoreGlobal: true,
        })
    ],
    external: Object.keys(globals),
};
