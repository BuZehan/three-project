import * as THREE from 'three';

export const createCube = (size = 1, color = 0x00ff00) => {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color });
  return new THREE.Mesh(geometry, material);
};

export const createSphere = (radius = 1, color = 0xff0000) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  return new THREE.Mesh(geometry, material);
};
