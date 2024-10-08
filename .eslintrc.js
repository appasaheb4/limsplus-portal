module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'plugin:unicorn/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'folders',
    // 'unused-imports',
  ],
  rules: {
    indent: [0, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'react/jsx-indent-props': [0, 'tab'],
    'react/jsx-props-no-spreading': 0,
    'no-tabs': 0,
    'no-console': 0,
    'no-unused-expressions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/indent': 'off',
    'react/require-default-props': 0,
    'react/jsx-indent': [0, 'tab'],
    '@typescript-eslint/no-use-before-define': 'off',
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-shadow': 'off',
    // ['error', { devDependencies: true }],
    'implicit-arrow-linebreak': 'off',
    // Conflicts with max length if enabled
    '@typescript-eslint/no-unused-vars': 'off',
    'unicorn/no-array-callback-reference': 'off',
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-cycle': 0,
    '@typescript-eslint/naming-convention': 0,
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': 0,
    'unicorn/filename-case': [
      'off',
      {
        case: 'kebabCase',
        ignore: ['App.css', 'App.test.tsx', 'App.tsx'],
      },
    ],
    'unicorn/prevent-abbreviations': 0,
    'unicorn/explicit-length-check': 0,
    'unicorn/prefer-optional-catch-binding': 0,
    'unicorn/no-empty-file': 0,
    'unicorn/prefer-export-from': 0,
    'unicorn/no-null': 0,
    'unicorn/prefer-module': 0,
    'unicorn/consistent-function-scoping': 0,
    'unicorn/prefer-spread': 0,
    'unicorn/consistent-destructuring': 0,
    'unicorn/no-new-array': 0,
    'folders/match-regex': [2, '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', '/src/'],
    'unicorn/no-static-only-class': 0,
    'unicorn/better-regex': 0,
    'unicorn/prefer-ternary': 0,
    'unicorn/prefer-set-has': 0,
    'unicorn/prefer-query-selector': 0,
    'unicorn/prefer-node-protocol': 0,
    'unicorn/prefer-negative-index': 0,
    'unicorn/catch-error-name': 0,
    'no-mixed-spaces-and-tabs': 0,
    'unicorn/custom-error-definition': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'no-nested-ternary': 'off',
    'unicorn/no-nested-ternary': 'off',
    ' unicorn/no-array-for-each': 'off',
    'unicorn/prefer-object-from-entries': 'off',
    'unicorn/no-new-buffer': 'error',
    'unicorn/string-content': 'off',
    'unicorn/throw-new-error': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/jsx-key': 'off',
    'no-async-promise-executor': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'unicorn/prefer-dom-node-append': 'off',
    'unicorn/no-array-for-each': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'no-extra-boolean-cast': 'off',
    'react/no-children-prop': 'off',
    // 'unused-imports/no-unused-imports': 'error',
  },
};
