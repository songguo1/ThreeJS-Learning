import * as THREE from "three";
import { initScene } from "./scene";
import { initPlayer, handleMovement } from "./player";
import { initBlockSystem } from "./blocks/blockSystem";
import { initEventListeners } from "./events";
// 初始化主要组件
const scene = initScene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
const { controls, playerState } = initPlayer(camera, document.body);
const blockSystem = initBlockSystem(scene);

// 游戏循环
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  if (controls.isLocked) {
    const delta = clock.getDelta();
    handleMovement(delta, playerState, controls, scene, camera);
  }
  renderer.render(scene, camera);
}

// 初始化和启动
function init() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.set(0, 5, 0);
  initEventListeners(controls, scene, camera, blockSystem, playerState);
  animate();
}
init();
