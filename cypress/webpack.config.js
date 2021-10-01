module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  node: { fs: 'empty', child_process: 'empty', readline: 'empty' },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true }
      },
      {
        test: /\.feature$/,
        loader: 'cypress-cucumber-preprocessor/loader'
      }
    ]
  }
};
