module.exports = {
  env: {
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['import', 'jsdoc', 'no-null', '@typescript-eslint', 'prefer-arrow'],
  rules: {
    complexity: ['error', { max: 10 }],
    'require-await': 'error',
    'max-lines-per-function': ['error', { max: 100 }],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: false, allowTernary: true }
    ],
    'no-null/no-null': 'error',
    'func-names': ['error', 'always'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
            fixWith: 'object'
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
            fixWith: 'string'
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
            fixWith: 'boolean'
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
            fixWith: 'number'
          },
          Function: {
            message:
              'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
          }
        },
        extendDefaults: false
      }
    ],
    quotes: 'off',
    '@typescript-eslint/no-dynamic-delete': 'error',
    'max-len': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array'
      }
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    'no-empty-pattern': 'error',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/restrict-plus-operands': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'always'
      }
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true
      }
    ],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    'import/no-unresolved': 'off',
    'import/no-default-export': 'error',
    'import/no-deprecated': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-internal-modules': [
      'off', // unable to select all directories inside other directories to be allowed
      {
        allow: ['src/*']
      }
    ],
    'import/no-unassigned-import': 'error',
    'import/order': 'error',
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'off',
    'jsdoc/newline-after-description': 'error',
    'jsdoc/no-types': 'error',
    'prefer-rest-params': 'error',
    'no-case-declarations': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
    'no-control-regex': 'error',
    'no-extra-boolean-cast': 'off',
    'arrow-body-style': ['off', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'brace-style': ['error', '1tbs'],
    camelcase: ['error', { properties: 'never', ignoreImports: true }],
    'class-methods-use-this': 'off',
    'comma-dangle': 'error',
    'constructor-super': 'error',
    curly: 'error',
    'default-case': 'off',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined'
    ],
    'no-undefined': 'off',
    'semi-style': ['error', 'last'],
    'linebreak-style': ['error', 'unix'],
    'max-classes-per-file': 'off',
    'max-lines': ['error', 300],
    'new-parens': 'error',
    'newline-per-chained-call': 'off',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-constant-condition': 'error',
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'import/export': 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'off', // Reconsider when https://github.com/typescript-eslint/typescript-eslint/issues/491 is fixed
    'no-irregular-whitespace': 'error',
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, -1, 2],
        detectObjects: false
      }
    ],
    'no-multi-str': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-plusplus': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-regex-spaces': 'error',
    strict: 'error',
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'no-return-await': 'error',
    'no-sequences': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': [
      'off',
      {
        allowAfterThis: true,
        enforceInMethodNames: true
      }
    ],
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-useless-constructor': 'off',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      }
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
        allowStandaloneDeclarations: true
      }
    ],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    'space-before-function-paren': 'off',
    'space-in-parens': ['error', 'never'],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ],
    'unicorn/filename-case': 'off',
    'use-isnan': 'error',
    'valid-typeof': 'off',
    yoda: 'error'
  }
};
