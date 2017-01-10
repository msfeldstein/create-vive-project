require('./extras/THREE.VRControls')
require('./extras/THREE.VREffect')
const WEBVR = require('./extras/WebVR')

module.exports = function(renderer, scene, camera) {
  // VRControls handles mapping the HMD position and orientation to the threejs camera
  const vrControls = new THREE.VRControls(camera)
  // VREffect handles rendering and communicating with the HMD
  const vrEffect = new THREE.VREffect(renderer)
  if ( navigator.getVRDisplays ) {
    document.body.appendChild( WEBVR.getButton( vrEffect ) );
  }

  const renderCallbacks = []

  function animate(t) {
    TWEEN.update(t)
    vrEffect.requestAnimationFrame(animate)
    renderCallbacks.forEach((f) => f(t))
    vrControls.update()
    vrEffect.render(scene, camera)
  }
  vrEffect.requestAnimationFrame(animate)

  const addRenderCallback = function(cb) {
    renderCallbacks.push(cb)
  }

  return {
    addRenderCallback,
    vrControls
  }
}
