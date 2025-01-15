import * as THREE from 'three';

class SceneManager {
  constructor() {
    // 初始化场景
    this.scene = new THREE.Scene();

    // 默认光照
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    this.scene.add(ambientLight);
  }

  // 添加对象到场景
  addObject(object) {
    this.scene.add(object);
  }

  // 移除对象
  removeObject(object) {
    this.scene.remove(object);
  }

  // 获取场景实例
  getScene() {
    return this.scene;
  }

  // 清空场景
  clearScene() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }
}

export default SceneManager;
