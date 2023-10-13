import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import fs from 'fs';
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import path from "path";

// Load the package.json file for the specific package being built
const PACKAGE_PATH = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(PACKAGE_PATH, 'package.json'), 'utf-8'));

const globals = {
    ...packageJson.devDependencies,
};

export default {
    input: path.join(PACKAGE_PATH, 'src/index.ts'),
    output: [
        {
            file: packageJson.main,
            format: 'cjs', // commonJS
            sourcemap: true,
            sourcemapExcludeSources: true,
        },
        {
            file: packageJson.module,
            format: 'esm', // ES Modules
            sourcemap: true,
            sourcemapExcludeSources: true,
        },
    ],
    plugins: [
        excludeDependenciesFromBundle(),
        peerDepsExternal(),
        json(),
        resolve(),
        typescript({
            tsconfig: path.join(PACKAGE_PATH, 'tsconfig.json'),
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
