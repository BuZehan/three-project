import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ControlsManager {
  constructor(camera, renderer) {
    // 初始化 OrbitControls
    this.controls = new OrbitControls(camera, renderer.domElement);

    // 设置默认参数
    this.controls.enableDamping = true; // 启用阻尼效果
    this.controls.dampingFactor = 0.05; // 阻尼系数
    this.controls.screenSpacePanning = false; // 禁止平移
    this.controls.minDistance = 1; // 最小缩放距离
    this.controls.maxDistance = 100; // 最大缩放距离
  }

  // 更新控制器（在动画循环中调用）
  update() {
    this.controls.update();
  }

  // 设置控制器目标
  setTarget(x, y, z) {
    this.controls.target.set(x, y, z);
    this.controls.update();
  }

  // 启用或禁用控制器
  setEnabled(enabled) {
    this.controls.enabled = enabled;
  }

  // 获取控制器实例
  getControls() {
    return this.controls;
  }
}

export default ControlsManager;
