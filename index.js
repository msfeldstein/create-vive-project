window.USE_VR = true
window.THREE = require('three')
window.TWEEN = require('tween.js')
require('./src/extras/THREE.VRControls')
require('./src/extras/THREE.VREffect')
const WEBVR = require('./src/extras/WebVR')

const OrbitControls = require('three-orbit-controls')(THREE)
const ViveController = require('three-vive-controller')(THREE)

const {
  canvas,
  camera,
  renderer,
  scene
} = require('./src/setup-world')



const vrControls = new THREE.VRControls(camera)
const vrEffect = new THREE.VREffect(renderer)
const {addRenderCallback} =
  require('./src/render-loop')(renderer, scene, camera, vrEffect, vrControls)
const controllers = [
  new ViveController(0, vrControls),
  new ViveController(1, vrControls)
]
scene.add(controllers[0], controllers[1])

if (USE_VR) {
  if ( navigator.getVRDisplays ) {
    document.body.appendChild( WEBVR.getButton( vrEffect ) );
  }
} else {
  camera.position.set(10, 10, 10)
  camera.lookAt(new THREE.Vector3())
  new OrbitControls(camera)
}

require('./src/setup-scene')(scene, addRenderCallback)