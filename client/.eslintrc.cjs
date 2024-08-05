module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react-refresh"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
      { "allowExportNames": ["meta", "links", "headers", "loader", "action"] }
    ],
    'no-unused-vars': 'off',
    "react-refresh/only-export-components": "error",
    '@typescript-eslint/no-unused-vars': 'off',
    "@typescript-eslint/no-explicit-any": ["off"]
  },
}
