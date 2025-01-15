<template>
    <div class="container">
        <div id="scene" width="100%" height="100%"></div>
    </div>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import SceneManager from '../three/scene.js';
import RendererManager from '../three/renderer.js';
import CameraManager from '../three/camera.js';
import ControlsManager from '../three/controls.js';

import { createCube } from '../three/utils.js';

onMounted(() => {
    const container = document.getElementById('scene');

    // 初始化场景、渲染器、摄像机
    const sceneManager = new SceneManager();
    const rendererManager = new RendererManager(container);
    const cameraManager = new CameraManager();
    // 初始化控制器
    const controlsManager = new ControlsManager(
        cameraManager.getCamera(),
        rendererManager.getRenderer()
    );

    // 创建立方体并添加到场景
    const cube = createCube(1, 0x00ff00);
    sceneManager.addObject(cube);

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        rendererManager.render(sceneManager.getScene(), cameraManager.getCamera());
    }
    animate()
})
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