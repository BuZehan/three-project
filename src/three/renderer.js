import * as THREE from 'three';

class RendererManager {
  constructor(container, width = window.innerWidth, height = window.innerHeight) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
    this.renderer.setSize(width, height);
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
