module.exports = function(scene, addRenderCallback) {
  const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 50),
    new THREE.MeshPhongMaterial({
      color: 0xefefef,
      side: THREE.DoubleSide
    })
  )
  floor.rotation.x = -Math.PI / 2
  const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3, 3, 3),
    new THREE.MeshLambertMaterial({color: 0xfc20cf})
  )
  scene.add(floor, cube)
  
  addRenderCallback(() => {
    cube.position.y = 3 + Math.sin(Date.now() / 1000)  
  })
}