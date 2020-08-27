const path = require('path')

const CWD = process.cwd()
const TEST_CONFIG_DIR = path.resolve(CWD, 'test/unit/config')
const SETUP_FILES = path.resolve(TEST_CONFIG_DIR, 'jest.setup.js')

module.exports = {
  setupFiles: [SETUP_FILES],
  reporters: [
    'default'
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageThreshold: {
    // global: {
    //   statements: 100,
    //   branches: 100,
    //   functions: 100,
    //   lines: 100
    // }
  },
  // testURL: 'https://firemind.qliksense.firemind.io/firemind/extensions/clone-for-writeback/clone-for-writeback.html',
  verbose: true
}