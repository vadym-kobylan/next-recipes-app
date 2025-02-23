import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js recommended configs for core web vitals and TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Best Practices
      'no-debugger': 'error', // Disallow debugger statements
      'eqeqeq': 'error', // Require strict equality checks (=== and !==)
      'curly': 'error', // Require curly braces for all control statements

      // Variables
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],

      // React & JSX
      'react/react-in-jsx-scope': 'off', // Not needed with Next.js (React 17+)
      'react/jsx-key': 'error', // Ensure each element in a list has a unique key

      // Import rules
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],

      // Code Style
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Require semicolons
      'indent': ['error', 2], // Enforce 2-space indentation
    },
  },
];

export default eslintConfig;
