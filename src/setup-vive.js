const ViveController = require('three-vive-controller')(THREE)

window.controllers = [
  new ViveController(0, window.vrControls),
  new ViveController(1, window.vrControls)
]

scene.add(controllers[0], controllers[1])
