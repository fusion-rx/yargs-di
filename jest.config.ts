import { register } from 'ts-node';
import { Config } from 'jest';

register({
    compilerOptions: {
        module: 'nodenext'
    }
});

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '(.+)\\.js': '$1'
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    globals: {
        'ts-jest': {
            useESM: true
        }
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node'
};

export default config;
