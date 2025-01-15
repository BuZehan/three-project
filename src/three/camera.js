import * as THREE from 'three';

class CameraManager {
  constructor(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 5); // 默认位置
  }

  // 获取摄像机实例
  getCamera() {
    return this.camera;
  }

  // 设置摄像机位置
  setPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }
}

export default CameraManager;
