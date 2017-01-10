module.exports = function(scene, addRenderCallback) {
  const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 50),
    new THREE.MeshPhongMaterial({
      color: 0xefefef,
      side: THREE.DoubleSide
    })
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -5
  scene.add(floor)
  
  const makeCube = function(x, z) {
    const cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(3, 3, 3),
      new THREE.MeshPhongMaterial({color: 0xfc20cf})
    )  
    cube.position.x = x
    cube.position.z = z
    scene.add(cube)
  }
  makeCube(-4, 4)
  makeCube(-4, -4)
  makeCube(4, -4)
  makeCube(4, 4)
  
  addRenderCallback(() => {
    // cube.position.y = 3 + Math.sin(Date.now() / 1000)  
  })
}