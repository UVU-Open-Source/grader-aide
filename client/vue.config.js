module.exports = {
  configureWebpack: {
    rules: [
      {
        test: /\.styl$/,
        loader: ['stylus-loader']
      }
    ]
  }
};