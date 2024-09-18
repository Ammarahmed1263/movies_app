const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 * 
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Add custom resolver config to properly resolve TypeScript, JavaScript, and asset files
const customConfig = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx', 'js', 'jsx'], // Ensure these extensions are handled
    assetExts: [...defaultConfig.resolver.assetExts, 'png', 'jpg', 'jpeg', 'svg'], // Support image assets
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
