import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import sonarjs from 'eslint-plugin-sonarjs'
import reactCompiler from 'eslint-plugin-react-compiler'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    ignores: ['node_modules', 'dist', 'dev-dist', 'public'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        RequestInit: true,
        NotificationOptions: true,
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      sonarjs,
      'react-compiler': reactCompiler,
      'import': importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,

      '@typescript-eslint/no-explicit-any': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      'curly': ['warn', 'all'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
          'pathGroups': [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          'pathGroupsExcludedImportTypes': ['react'],
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
]
