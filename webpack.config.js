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
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  esmodules: true,
                },
              },
            ],
            "@babel/preset-react",
          ],
        },
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
      <!DOCTYPE html>
      <html>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `,
    }),
  ],
};
