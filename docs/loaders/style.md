# Style Loaders

# Extract-Text-Webpack-Plugin
### By default, webpack inlines all style files into the index.html file.
### The Extract-Text-Webpack-Plugin allows you to extract your styles into external files.
### Learn more [here](https://github.com/webpack/extract-text-webpack-plugin)
## Setup
### In terminal, type:
```sh
$ npm install extract-text-webpack-plugin --save
```
## All styles in separate files
#### Add this line:
```javascript
new ExtractTextPlugin("styles.css")
```
#### to the plugin section of the prod.config.js and dev.config.js
## All styles in one file
#### Add this line:
```javascript
new ExtractTextPlugin('bundle.css', { allChunks: true })
```
#### to the plugin section of the prod.config.js and dev.config.js


# Prerequisites
### Before adding loaders for LESS or SASS we need to add the style-loader and css-loader packages
### In terminal, type:
```sh
$ npm install style-loader css-loader --save
```

# CSS
## with extract-text-plugin
#### Add this line:
```javascript
{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap') }
```
#### to the loader section of the prod.config.js and dev.config.js
## without extract-text-plugin
#### Add this line:
```javascript
{ test: /\.css$/, loader: "style!css" }
```
#### to the loader section of the prod.config.js and dev.config.js

# LESS
## with extract-text-plugin
#### Add this line:
```javascript
{ test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') }
```
#### to the loader section of the prod.config.js and dev.config.js
## without extract-text-plugin
#### Add this line:
```javascript
{ test: /\.less$/, loader: "style!css!less" }
```
#### to the loader section of the prod.config.js and dev.config.js

# SASS
## with extract-text-plugin
#### Add this line:
```javascript
{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') }
```
#### to the loader section of the prod.config.js and dev.config.js
## without extract-text-plugin
#### Add this line:
```javascript
{ test: /\.scss$/, loader: "style!css!sass" }
```
#### to the loader section of the prod.config.js and dev.config.js
