module.exports = {
  presets: [
  [ "@vue/app", { useBuiltIns: "entry" } ] 
  ],
  plugins: ["@babel/plugin-transform-runtime"],
    comments: false,
    env: {
      test: {
        presets: ["@babel/preset-env"],
        plugins: ["istanbul"]
      }
    }
};
