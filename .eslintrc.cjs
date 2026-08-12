const path = require('path')

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: [
    'dist',
    'build',
    'api',
    '*.config.js',
    '*.config.cjs',
    '.eslintrc.cjs',
    '.eslintrc.a11y.cjs',
    'node_modules',
    '.prettierrc',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    tailwindcss: {
      config: path.resolve(__dirname, 'tailwind.config.js'),
      callees: ['classnames', 'clsx', 'ctl', 'cn'],
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
  },
  globals: {
    __dirname: true,
  },
}
