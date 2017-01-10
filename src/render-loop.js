module.exports = function(renderer, scene, camera, vrEffect, vrControls) {
  const renderCallbacks = []

  function animate(t) {
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
    addRenderCallback
  }
}