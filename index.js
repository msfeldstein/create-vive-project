window.USE_VR = true
window.THREE = require('three')
window.TWEEN = require('tween.js')
const OrbitControls = require('three-orbit-controls')(THREE)
const ViveController = require('three-vive-controller')(THREE)

// Set up the standard threejs rig
const {
  canvas,
  camera,
  renderer,
  scene
} = require('./src/setup-world')

// The render loop code manages all global updating, as well as gives us
// a way to add render callbacks since callbacks are queued on the VR queue
// It also sets up the VRControls and VREffect since you don't really need to use
// it anywhere else.
const {addRenderCallback, vrControls} =
  require('./src/render-loop')(renderer, scene, camera)

const controllers = [
  new ViveController(0, vrControls),
  new ViveController(1, vrControls)
]
window.controllers = controllers
scene.add(controllers[0], controllers[1])

if (!USE_VR) {
  console.log("Install the WebVR Emulator from the chrome store")
  camera.position.set(10, 10, 10)
  camera.lookAt(new THREE.Vector3())
  new OrbitControls(camera)
}

/**
  * Put all your cool ideas below this line!!
  **/

// Set up a random scene with a floor and a few cubes around, i dont know why
require('./src/setup-scene')(scene, addRenderCallback)

// Set up the controllers to blow some bubbles
controllers.forEach((controller) => {
  // Every time you press the trigger, lets blow up a balloon
  controller.on(controller.TriggerClicked, () => {
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
