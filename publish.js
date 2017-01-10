var ghpages = require('gh-pages')
var path = require('path')
var fs = require('fs-extra')
var browserify = require('browserify') 
var babelify = require('babelify')
var html = require('simple-html-index')

fs.mkdirSync("dist")

browserify('./index.js')
  .transform(babelify, {presets: []})
  .bundle()
  .pipe(fs.createWriteStream("dist/bundle.js"))

html({entry: 'bundle.js'})
  .pipe(fs.createWriteStream("dist/index.html"))

// ghpages.publish(path.join(__dirname, 'dist'), function(err) { ... });