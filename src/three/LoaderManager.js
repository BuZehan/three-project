import * as THREE from 'three'
// 创建一个 LoadingManager 实例
const manager = new THREE.LoadingManager();

// 设置加载开始回调
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`开始加载文件：${url}。已加载 ${itemsLoaded} / ${itemsTotal} 个文件。`);
  };
  
  // 设置全部加载完成回调
  manager.onLoad = function () {
    console.log('所有资源加载完成！');
  };
  
  // 设置加载进度回调
  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(`正在加载：${url}。已加载 ${itemsLoaded} / ${itemsTotal} 个文件。`);
  };
  
  // 设置加载错误回调
  manager.onError = function (url) {
    console.error(`加载出错：${url}`);
  };

  export default manager;