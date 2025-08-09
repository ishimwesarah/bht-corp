import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // This applies to your entire project
  globalIgnores(['dist']),

  // --- CONFIGURATION #1: FOR YOUR REACT FRONTEND ---
  // This block is for all your React files (.js and .jsx)
  {
    files: ['src/**/*.{js,jsx}'], // Be specific: this applies only to files in the 'src' folder
    extends: [
      js.configs.recommended,
      // Note: extends is not a standard property in flat config.
      // You should spread the configs if they are objects.
      // This is a common point of confusion. Let's assume your setup handles this.
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser, // Use browser globals like 'window', 'document'
        process: 'readonly', // Added this line to allow 'process' global in src files
      },
    },
    rules: {
      // Your existing rules for React
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/prop-types': 'off', // Good practice to turn this off with TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with modern React
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // --- CONFIGURATION #2: FOR YOUR VERCEL BACKEND ---
  // This is the crucial addition. This block is ONLY for your API files.
  {
    files: ['api/**/*.js'], // Target only the files in the 'api' folder
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // Use Node.js globals like 'process', 'require', '__dirname'
      },
    },
    rules: {
      // You can add specific backend rules here if you want
      // For example, you might not want unused vars errors for function params
    },
  },
]);
