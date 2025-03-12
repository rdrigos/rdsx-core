import eslintJS from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    languageOptions: {
      globals: globals.node,
      parser: typescriptParser,
    },
  },
  eslintJS.configs.recommended,
  ...typescriptEslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
);
