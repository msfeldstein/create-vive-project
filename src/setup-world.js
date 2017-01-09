const FullScreenCanvas = require("@msfeldstein/full-screen-canvas")

const canvas = FullScreenCanvas()

var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 700);
scene.add(camera)

var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 200, 200, 200 );
scene.add( directionalLight );

const renderCallbacks = []

function animate(t) {
  requestAnimationFrame(animate)
  renderCallbacks.forEach((f) => f(t))
  renderer.render(scene, camera)
}
requestAnimationFrame(animate)

const addRenderCallback = function(cb) {
  renderCallbacks.push(cb)
}

module.exports =  {
  addRenderCallback,
  ambientLight,
  canvas,
  camera,
  directionalLight,
  renderer,
  scene
}