// This will set everything up and make things available via
// window.[scene, camera, renderer, canvas, addRenderLoop, TWEEN,
// vrEffect, vrControls].  See setup.js to see what is available
require('./src/setup')

// Set up a random scene with a floor and a few cubes around, i dont know why
require('./src/setup-scene')(scene, addRenderCallback)

// Set up the controllers to blow some bubbles
controllers.forEach((controller) => {
  // Every time you press the trigger, lets blow up a balloon
  controller.on(controller.TriggerClicked, () => {
    console.log("Clicked")
    var bubble = new THREE.Mesh(
      new THREE.SphereBufferGeometry(.1, 32, 32),
      new THREE.MeshPhongMaterial({transparent: true})
    )
    bubble.scale.set(0.01, 0.01, 0.01)
    controller.bubble = bubble
    bubble.position.z = -.1
    controller.add(bubble)
    // The tween library lets us animate values in one line of code
    // You can store the tween to stop it later
    bubble.growing = new TWEEN.Tween(bubble.scale).to({x: 1, y: 1, z: 1}, 1000).start()
  })

  controller.on(controller.TriggerUnclicked, function() {
    // Cancel the tween so it doesn't keep growing once its released
    controller.bubble.growing.stop()
    // SceneUtils.detach lets you change the parent of an object while keeping
    // its global position unchanged
    THREE.SceneUtils.detach(controller.bubble, controller, scene)
    // Lets have the balloon float up and fade out, and remove it from the
    // scene when the animation is done
    new TWEEN.Tween(controller.bubble.position)
      .to({y: controller.bubble.position.y + .3}, 1000).start()
    new TWEEN.Tween(controller.bubble.material)
      .to({opacity: 0}, 1000)
      .onComplete(function() { this.parent.remove(this) }.bind(controller.bubble))
      .start()
  })
})
