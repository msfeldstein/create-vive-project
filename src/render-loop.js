require('./extras/THREE.VRControls')
require('./extras/THREE.VREffect')
window.TWEEN = require('tween.js')
const WEBVR = require('./extras/WebVR')

// VRControls handles mapping the HMD position and orientation to the threejs camera
window.vrControls = new THREE.VRControls(camera)
// VREffect handles rendering and communicating with the HMD
window.vrEffect = new THREE.VREffect(renderer)
if ( navigator.getVRDisplays ) {
  document.body.appendChild( WEBVR.getButton( vrEffect ) );
}

const renderCallbacks = []

function animate(t, dt) {
  console.log(dt)
  TWEEN.update()
  vrEffect.requestAnimationFrame(animate)
  renderCallbacks.forEach((f) => f(t))
  vrControls.update()
  vrEffect.render(scene, camera)
}
vrEffect.requestAnimationFrame(animate)

window.addRenderCallback = function(cb) {
  renderCallbacks.push(cb)
}

module.exports = {
  addRenderCallback,
  vrControls,
  vrEffect
}
