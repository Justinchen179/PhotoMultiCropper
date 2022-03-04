module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: ['prettier-standard', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'const',
          'export',
          'import',
          'let',
          'var'
        ]
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'const',
          'export',
          'import',
          'let',
          'var'
        ],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        prev: ['export', 'import'],
        next: ['export', 'import']
      },
      {
        blankLine: 'always',
        prev: ['multiline-let', 'multiline-var', 'multiline-const'],
        next: ['multiline-let', 'multiline-var', 'multiline-const']
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: ['multiline-let', 'multiline-var', 'multiline-const']
      },
      {
        blankLine: 'always',
        prev: ['multiline-let', 'multiline-var', 'multiline-const'],
        next: ['const', 'let', 'var']
      }
    ]
  }
}
