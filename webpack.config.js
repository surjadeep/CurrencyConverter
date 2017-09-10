module.exports = {

  entry: "./client/index.js",
  output: {
    filename: "./dist/bundle.min.js"
  },
  module: {
    loaders: [
		{test:/\.js$/, loader: 'babel-loader', query: {presets:[ 'es2015', 'react', 'stage-2' ]},exclude: /node_modules/},
		{test:/\.jsx?$/, loader: 'babel-loader', query: {presets:[ 'es2015', 'react', 'stage-2' ]}, exclude: /node_modules/},
		{test: /\.scss/,loader: 'style-loader!css-loader!sass-loader'},
		{test: /\.css$/,loader: 'style!css!',exclude: /node_modules/}
    ]
  },
  devServer: {
    contentBase: "./",
    hot: false,
    historyApiFallback: true
  }
}
