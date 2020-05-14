const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index"),
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[name].js",
  },
  plugins: [
    new webpack.ProvidePlugin({ decomp: 'poly-decomp' }),
    new HtmlWebpackPlugin({
      title: "Sokrates",
    }),
    new CopyWebpackPlugin([{ from: "./src/assets", to: "assets" }]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    port: 1234,
    hot: true,
  },
};
