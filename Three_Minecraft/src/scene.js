//===场景===
import * as THREE from "three";

export function initScene() {
  const scene = new THREE.Scene();

  // 设置天空盒
  const skyboxTextures = new THREE.CubeTextureLoader().load([
    "/textures/skybox/right.png",
    "/textures/skybox/left.png",
    "/textures/skybox/top.png",
    "/textures/skybox/bottom.png",
    "/textures/skybox/front.png",
    "/textures/skybox/back.png",
  ]);
  scene.background = skyboxTextures;

  // 添加光源
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.add(directionalLight);

  return scene;
}
