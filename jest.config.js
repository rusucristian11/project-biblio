export default {
    preset: "ts-jest",
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transformIgnorePatterns: [
        "node_modules/(?!axios.*)"
    ],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
}