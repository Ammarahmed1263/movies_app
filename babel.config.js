module.exports = {
  presets: ['module:@react-native/babel-preset'],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "alias": {
          "@atoms": "./src/components/atoms",
          "@molecules": "./src/components/molecules",
          "@organisms": "./src/components/organisms",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@styles": "./src/styles",
          "@contexts": "./src/contexts",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
          "@services": "./src/api/services"
        }
      }
    ]
  ]
};
