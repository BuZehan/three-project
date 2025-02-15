import * as THREE from 'three';

class RendererManager {
  constructor(container, width = window.innerWidth, height = window.innerHeight) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true,logarithmicDepthBuffer: true }); //  alpha: true , 透明背景
    this.renderer.setSize(width, height);
    // 设置像素
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
  }

  // 设置渲染尺寸
  setSize(width, height) {
    this.renderer.setSize(width, height);
  }

  // 获取渲染器实例
  getRenderer() {
    return this.renderer;
  }

  // 渲染场景
  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

}

export default RendererManager;
