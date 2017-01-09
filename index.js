window.USE_VR = false
window.THREE = require('three')
window.TWEEN = require('tween.js')

const OrbitControls = require('three-orbit-controls')(THREE)
const ViveController = require('three-vive-controller')(THREE)

const {
  addRenderCallback,
  canvas,
  camera,
  renderer,
  scene
} = require('./src/setup-world')

if (!USE_VR) {
  camera.position.set(0, 10, -10)
  camera.lookAt(new THREE.Vector3())
  new OrbitControls(camera)
}

require('./src/setup-scene')(scene, addRenderCallback)