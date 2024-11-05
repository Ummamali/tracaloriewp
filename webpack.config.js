const path = require("path");
// Following plugin is used to generate a dynamic html file
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Following plugin is used to generate a css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  // entry point in ths source directory
  entry: "./src/index.js",
  // output folder and file
  output: {
    // filder
    path: path.resolve(__dirname, "dist"),
    // file
    filename: "bundle.js",
  },
  // running the development server (just like live server)
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  // using the loaders for css and javascript
  module: {
    rules: [
      // now we can import css in javascript and it will generate a css file in dict/
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      // babel loader to convert modern javascript to old javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // Setting the html dynamic generator plugin
    new HtmlWebpackPlugin({
      title: "Webpack Starter Application",
      filename: "index.html",
      template: "./src/index.html",
    }),
    // setting up the css synamic generator plugin
    new MiniCssExtractPlugin(),
  ],
};
