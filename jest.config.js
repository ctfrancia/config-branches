module.exports = {
  roots: [
    // '<rootDir>'
    './tests/'
  ],
  testMatch: [
    // 'tests/**/**/*.+(ts|tsx|js)',
    // '**/**/*.+(ts|tsx|js)',
    '**/**/?(*.)+(spec|test).+(ts|tsx|js)'
    // tests/**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
