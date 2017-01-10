#!/usr/bin/env node

var fsx = require('fs-extra')
var path = require('path')
var exec = require('child_process').exec

function main() {
  var args = process.argv
  console.log(args[0])
  if (args[0].indexOf("node") != -1) {
    console.log("SHIFTING")
    args.shift()
  }
  var name = args[1]
  if (!name) {
    console.error("Missing a project name")
    console.error("$ vive-boilerplate name-of-new-project")
    return
  }

  var src = __filename
  src = src.substring(0, Math.max(src.lastIndexOf("/"), src.lastIndexOf("\\")))
  var dest = path.join(process.cwd(), name)

  fsx.mkdirSync(dest)
  process.chdir(dest)

  fsx.copySync(
    path.join(src, "package.json"),
    "package.json"
  )

  fsx.copySync(
    path.join(src, "src"),
    "src"
  )

  console.log("Project created, installing dependencies...")
  var child = exec("npm install")
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  child.on('close', function() {
    console.log("\n\nYou're all set!  Just run 'npm start' from the project directory\n\n")
  })
}

main()
