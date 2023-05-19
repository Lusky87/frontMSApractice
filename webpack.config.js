module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
    resolve: {
      aliasFields: ['browser']
    },
    devServer: {
      proxy: 'http://localhost:5002'
    }
  }
};
