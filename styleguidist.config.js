const path = require('path')

const packagePath = path.resolve(
    __dirname,
    './package.json'
)
const packageFile = require(packagePath)


module.exports = {
  title: "VisualWizard",
  version: packageFile.version, 
  usageMode: 'expand', 
  pagePerSection: true, 
  sections: [
    {
      name: 'Components',
      components: './src/components/**/*.jsx',
      ignore: 
      [
      ]
    },
    {
      name: 'Scenes',
      sections:[
        
        {
          name: 'Procedure',
          components: 
          [
            './src/scenes/mainPages/Procedure.jsx',
            './src/scenes/subPages/Procedure/SubPage.jsx',
          ]
        },
        
      ]
    }
  ],

  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
            publicPath: url => `../assets/fonts/${url}`
          }
        },
        {
          test: /.(jpg|png|gif)$/,
          use:['url-loader']
        },
        {
          test: /\.pdf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: ['file-loader']
        },  
      ]
    }
  }
}