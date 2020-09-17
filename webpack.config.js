const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      templateContent: `
      <html>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `,
    }),
  ],
};
