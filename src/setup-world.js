const FullScreenCanvas = require("@msfeldstein/full-screen-canvas")
const OrbitControls = require('three-orbit-controls')(THREE)

const canvas = FullScreenCanvas()

window.renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

window.scene = new THREE.Scene()
window.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 700);
scene.add(camera)

var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 200, 200, 200 );
scene.add( directionalLight );

if (window.USE_ORBIT_CONTROLS) {
  console.log("Install the WebVR Emulator from the chrome store")
  camera.position.set(10, 10, 10)
  camera.lookAt(new THREE.Vector3())
  new OrbitControls(camera)
}

module.exports =  {
  ambientLight,
  canvas,
  camera,
  directionalLight,
  renderer,
  scene
}
