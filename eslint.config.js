import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...pluginJest.environments.globals.globals,
      },
    },
    plugins: { jest: pluginJest },
  },
  pluginJs.configs.recommended,
  {
    ignores: ['__tests__'],
  },
];
