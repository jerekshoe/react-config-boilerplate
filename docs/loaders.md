# Style Loaders
## Extract-Text-Webpack-Plugin
### By default, webpack inlines all style files into the index.html file.
### The Extract-Text-Webpack-Plugin can extract your styles into external files.
### Learn more [here](https://github.com/webpack/extract-text-webpack-plugin)
### All styles separate files
#### Add this line:
```javascript
new ExtractTextPlugin("styles.css")
```
#### to the plugin section of the prod.config.js and dev.config.js
### All styles in one file
#### Add this line:
```javascript
new ExtractTextPlugin('bundle.css', { allChunks: true })
```
## CSS
### with extract-text-plugin
#### Add this line:
```javascript
{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap') }
```
#### to the loader section of the prod.config.js and dev.config.js
### without extract-text-plugin
#### Add this line:
```javascript
```
#### to the loader section of the prod.config.js and dev.config.js
## LESS
## SASS
