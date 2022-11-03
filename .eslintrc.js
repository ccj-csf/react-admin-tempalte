module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    BASE_URL: true,
  },
  rules: {
    semi: [2, 'never'],
    'react/self-closing-comp': ['error'], //标签自动变成自闭合形式
    'react-hooks/rules-of-hooks': 0, // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 0, // Checks effect dependencies
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
        },
      },
    ],
  },
}
