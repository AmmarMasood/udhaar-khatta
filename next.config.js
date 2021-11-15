// module.exports = {
//   reactStrictMode: true,
// }
// next.config.js
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  // optional
  modifyVars: {
    "@primary-color": "#e87040", // primary color for all components
    "@link-color": "#e87040", // link color
    "@success-color": "#52c41a", // success state color
    "@warning-color": "#faad14", // warning state color
  },
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config;
  },
});
