module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    indent: [
      'error',
      2,
      { SwitchCase: 1 }
    ],
    'max-len': [
      'error',
      { code: 110, ignoreComments: true }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-multi-spaces': [
      'error'
    ],
    'no-multiple-empty-lines': [
      'error',
      { max: 1 }
    ],
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'template-curly-spacing': [
      'error',
      'never'
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'func-call-spacing': [
      'error',
      'never'
    ],
    'space-before-blocks': [
      'error',
      'always'
    ],
    'keyword-spacing': [
      'error',
      { before: true, after: true }
    ],
    'comma-spacing': [
      'error',
      { before: false, after: true }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    eqeqeq: [
      'error',
      'always'
    ],
    'arrow-spacing': [
      'error',
      { before: true, after: true }
    ],
    'arrow-parens': [
      'error',
      'always'
    ],
    // 'arrow-body-style': [
    //   'error',
    //   'as-needed'
    // ],
    'semi-spacing': [
      'error',
      { before: false, after: true }
    ],
    'key-spacing': [
      'error',
      { mode: 'strict' }
    ],
    'default-param-last': [
      'error'
    ],
    'max-params': [
      'error',
      4
    ],
    'space-infix-ops': [
      'error',
      { 'int32Hint': false }
    ],
    'react/react-in-jsx-scope': [
      'off' // React is a global const
    ],
    'object-shorthand': [
      'error',
      'always'
    ]
  }
};
