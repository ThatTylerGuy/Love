import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()

const light = new THREE.PointLight(0xffffff, 1000)
light.position.set(-2.5, -7.5, -15)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    100
)
camera.position.z = -5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


const objLoader = new OBJLoader()
objLoader.load(
    'LoveOBJ/love_heart.obj',
    (object) => {
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


function animate() {
    requestAnimationFrame(animate)


    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
