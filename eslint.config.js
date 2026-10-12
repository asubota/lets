import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importXPlugin from 'eslint-plugin-import-x'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const fcMessage = 'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177'

// Files executed by Node (tooling), as opposed to the browser/service-worker app in src/
const nodeFiles = ['*.{js,ts}', 'hooks/**/*.js']

const localPlugin = {
  rules: {
    'no-import-alias': {
      meta: {
        type: 'suggestion',
        messages: { alias: "Don't alias import '{{name}}' — rename it at the declaration instead" },
      },
      create: (context) => ({
        ImportSpecifier(node) {
          const imported = node.imported.type === 'Identifier' ? node.imported.name : node.imported.value
          if (imported !== node.local.name) {
            context.report({ node, messageId: 'alias', data: { name: imported } })
          }
        },
      }),
    },
  },
}

export default [
  {
    ignores: ['node_modules', 'dist', 'dev-dist', 'public', '.agents', '.claude', 'src/routeTree.gen.ts'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    settings: {
      react: { version: 'detect' },
      n: { version: '>=24.20.0' },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
  unicorn.configs.recommended,
  sonarjs.configs.recommended,
  security.configs.recommended,
  importXPlugin.flatConfigs.recommended,
  importXPlugin.flatConfigs.typescript,
  promise.configs['flat/recommended'],
  {
    files: nodeFiles,
    ...n.configs['flat/recommended-module'],
    languageOptions: {
      ...n.configs['flat/recommended-module'].languageOptions,
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
  {
    plugins: { local: localPlugin },
    rules: {
      'local/no-import-alias': 'error',
      'curly': ['error', 'all'],
      'no-empty': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      // TanStack Router: `throw redirect(...)` is the documented API
      '@typescript-eslint/only-throw-error': [
        'error',
        { allow: [{ from: 'package', package: '@tanstack/router-core', name: 'Redirect' }] },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-invalid-void-type': ['error', { allowAsThisParameter: true }],
      // `str || fallback` intentionally treats '' as missing
      '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            'React.FC': { message: fcMessage },
            'FC': { message: fcMessage },
            'React.FunctionComponent': { message: fcMessage },
            'React.FunctionalComponent': { message: `Preact specific, ${fcMessage.toLowerCase()}` },
          },
        },
      ],
      'react/jsx-no-useless-fragment': 'error',
      'import-x/no-cycle': ['error', { ignoreExternal: true, maxDepth: 10 }],
      'import-x/no-named-as-default': 'error',
      'import-x/no-named-as-default-member': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
          'pathGroups': [{ pattern: 'react', group: 'external', position: 'before' }],
          'pathGroupsExcludedImportTypes': ['react'],
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      // Bracket access on typed records is the norm here; noUncheckedIndexedAccess covers the real risk
      'security/detect-object-injection': 'off',
      'unicorn/no-null': 'off', // Supabase/PostgREST and React use null
      'unicorn/explicit-length-check': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          // Its autofix would alias imports (`foo as bar`); flag the declaration instead
          checkShorthandImports: false,
          allowList: {
            db: true,
            res: true,
            req: true,
            args: true,
            params: true,
            props: true,
            Props: true,
            ref: true,
            env: true,
            dir: true,
          },
        },
      ],
    },
  },
  {
    // Claude Code hook scripts: the exit code is the hook protocol, and they run local tools via npx
    files: ['hooks/**/*.js'],
    rules: {
      'n/no-process-exit': 'off',
      'unicorn/no-process-exit': 'off',
      'sonarjs/no-os-command-from-path': 'off',
    },
  },
  {
    // Typed rules need parserOptions.project, which is only set for .ts/.tsx
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // Plugin packages export `configs` both as a named export and on the default export (CJS/ESM interop)
    files: ['eslint.config.js'],
    rules: {
      'import-x/no-named-as-default-member': 'off',
    },
  },
]
