const path = require('path');

module.exports = {
  entry: './src/index.js', // Your main entry file
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory (it will be created if it doesn't exist)
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the following rules to .js files
        exclude: /node_modules/, // Don't apply to files in the node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel for transpiling JavaScript
          options: {
            presets: ['@babel/preset-env'], // Use the @babel/preset-env preset
          },
        },
      },
    ],
  },
};