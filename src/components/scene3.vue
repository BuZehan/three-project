<template>
    <div class="container">
        <div id="scene" width="100%" height="100%"></div>
    </div>
</template>

<script setup>
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import { onMounted } from 'vue'
import SceneManager from '../three/scene.js';
import RendererManager from '../three/renderer.js';
import CameraManager from '../three/camera.js';
import ControlsManager from '../three/controls.js';
import manager from '../three/LoaderManager';


import coffeeSmokeVertexShader from '../shaders/coffeeSmoke/vertex.glsl'
import coffeeSmokeFragmentShader from '../shaders/coffeeSmoke/fragment.glsl'

// Loaders
const textureLoader = new THREE.TextureLoader()
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/gltf/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// camera
let camera = null;
// scene
let scene = null;
// renderer
let renderer = null;



onMounted(() => {
    const container = document.getElementById('scene');

    // 初始化场景、渲染器、摄像机
    const sceneManager = new SceneManager();
    const rendererManager = new RendererManager(container);
    const cameraManager = new CameraManager();

    // scene camera renderer
    scene = sceneManager.getScene();
    camera = cameraManager.getCamera();
    renderer = rendererManager.getRenderer();

    // 初始化控制器
    const controlsManager = new ControlsManager(
        camera,
        renderer
    );

    /**
     * Main
     */
    gltfLoader.load('/model/bakedModel.glb', (gltf) => {
        console.log("gltf", gltf);
        gltf.scene.getObjectByName('baked').material.map.anisotropy = 8;
        scene.add(gltf.scene)
    })


    /**
     * Smoke
     */
    // Geometry
    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64)
    smokeGeometry.translate(0, 0.5, 0)
    smokeGeometry.scale(1.5, 6, 1.5)

    // Perlin texture
    const perlinTexture = textureLoader.load('/textures/perlin.png')
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping

    // Material
    const smokeMaterial = new THREE.ShaderMaterial({
        vertexShader: coffeeSmokeVertexShader,
        fragmentShader: coffeeSmokeFragmentShader,
        uniforms:
        {
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(perlinTexture)
        },
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false
        // wireframe: true
    })

    // Mesh
    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
    smoke.position.y = 1.83
    scene.add(smoke)

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    // 渲染循环
    function animate() {

        const elapsedTime = clock.getElapsedTime()

        // Update smoke
        smokeMaterial.uniforms.uTime.value = elapsedTime

        requestAnimationFrame(animate);
        controlsManager.update();
        rendererManager.render(scene, camera);
    }
    animate()

    // 窗口大小变化
    window.addEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        // Update renderer
        rendererManager.setSize(window.innerWidth, window.innerHeight)
    })
})

// load model 

</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

#scene {
    width: 100vw;
    height: 100vh;
}
</style>