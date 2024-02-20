module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: path.join(__dirname, '/babel.config.js')
    }
  },
};
