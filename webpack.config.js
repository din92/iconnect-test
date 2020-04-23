const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
    entry: {
      index:path.join(__dirname, "/src/js/index.js")
    //   backend:path.join(__dirname, "/src/js/backend.js")
    },
    output: {
     filename: "[name].js",
     path: path.join(__dirname, "/src/dist")
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
    },
    {
      test:/\.css$/,
      use:['style-loader','css-loader']
  }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};