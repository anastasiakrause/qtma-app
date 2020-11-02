module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [["babel-plugin-dotenv", {
    "replacedModuleName": "babel-dotenv"
  }]]
};
