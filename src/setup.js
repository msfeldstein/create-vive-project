window.THREE = require('three')

// set up global canvas, camera, renderer, scene
require('./setup-world')
// setup global TWEEN, addRenderCallback, vrControls, vrEffect
require('./render-loop')
// setup  global controllers
require('./setup-vive')
