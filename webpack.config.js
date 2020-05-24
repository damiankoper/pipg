const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (() => {
  const mode = process.env.NODE_ENV || "development" 
  return {
    mode: mode,
    entry: path.join(__dirname, "src", "index"),
    devtool: "inline-source-map",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
      chunkFilename: "[name].js",
    },
    plugins: [
      new webpack.ProvidePlugin({ decomp: "poly-decomp" }),
      new HtmlWebpackPlugin({
        title: "Sokrates",
      }),
      new CopyWebpackPlugin([
        { from: "./src/assets/spritesheets", to: "assets/spritesheets" },
      ]),
      new CopyWebpackPlugin([
        { from: "./src/assets/sound", to: "assets/sound" },
      ]),
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
    optimization:
      mode == "development"
        ? {}
        : {
            minimize: true,
            minimizer: [new TerserPlugin()],
          },
  };
})();
