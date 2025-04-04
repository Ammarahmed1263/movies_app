module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['./src'],
        alias: {
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@contexts': './src/contexts',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/api/services',
          '@redux': './src/redux',
          '@validation': './src/validation',
          '@constants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
