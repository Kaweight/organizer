const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
};
