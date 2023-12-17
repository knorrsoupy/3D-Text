import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Axes Helper
 */
// const axis=new THREE.AxesHelper()
// scene.add(axis)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCaptexture= textureLoader.load('./textures/matcaps/3.png')
matCaptexture.colorSpace= THREE.SRGBColorSpace


const tourusGeometry=new THREE.TorusGeometry(0.3,0.2,20,45)
const Material=new THREE.MeshMatcapMaterial({matcap: matCaptexture})

console.time('donut')
for(let i=0; i<200; i++)
{
    const tourus=new THREE.Mesh(tourusGeometry,Material)
       
    
    tourus.position.x=(Math.random()-0.5)*10
    tourus.position.y=(Math.random()-0.5)*10
    tourus.position.z=(Math.random()-0.5)*10

    tourus.rotation.x=Math.random()*Math.PI
    tourus.rotation.y=Math.random()*Math.PI
    
    const scale= Math.random()
    tourus.scale.x=scale
    tourus.scale.y=scale
    tourus.scale.z=scale
    scene.add(tourus)

}
console.timeEnd('donut')

/**
 * Adding font loader
 */

const fontloader= new FontLoader()

fontloader.load(
    '/fonts/helvetiker_regular.typeface.json',
    function test(font)
    {
        const textgeometry=new TextGeometry(
            '. . THE  TIME  HAS  COME . .',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments:4,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )
        textgeometry.center()
        // textgeometry.computeBoundingBox()
        // console.log(textgeometry.boundingBox)
        // textgeometry.translate(
        //     -(textgeometry.boundingBox.max.x -0.05)/ 2,
        //     -(textgeometry.boundingBox.max.y- 0.05)/ 2,
        //     -(textgeometry.boundingBox.max.z- 0.01)/ 2
        // )
                 
        const text= new THREE.Mesh(textgeometry,Material)
        scene.add(text)
    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()