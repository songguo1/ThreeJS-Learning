//===玩家===

import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { checkCollision, checkGroundCollision } from "./physics";

export function initPlayer(camera, element) {

  const controls = new PointerLockControls(camera, element);

  const playerState = {
    velocity: new THREE.Vector3(),
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    canJump: true,
    frontCollide: false,
    backCollide: false,
    leftCollide: false,
    rightCollide: false,
    onGround: false,
    height: 2,
    width: 1,
    speed: 5.0,
    boundingBox: new THREE.Box3()
  };

  return { controls, playerState };
}

export function handleMovement(delta, playerState, controls, scene, camera) {
  const cameraAngle = getCameraDirection(camera);
  
  // 地面检测
  const feetPosition = camera.position.clone();
  feetPosition.y -= playerState.height / 2 - 0.1;
  playerState.onGround = checkGroundCollision(feetPosition, scene);

  // 重力和跳跃
  if (!playerState.onGround) {
    playerState.velocity.y -= 20 * delta;
  } else if (playerState.velocity.y <= 0) {
    playerState.velocity.y = 0;
    playerState.canJump = true;
  }

  camera.position.y += playerState.velocity.y * delta;

  // 移动碰撞检测和移动
  handleCollisionAndMovement(playerState, controls, scene, camera, cameraAngle, delta);

  // 防止掉出地图
  if (camera.position.y < -10) {
    camera.position.y = 10;
    playerState.velocity.y = 0;
  }
}

// 获取相机方向
function getCameraDirection(camera) {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  return Math.atan2(direction.x, direction.z);
}

// 获取移动方向
function getMovementDirection(angle, moveType) {
  const direction = new THREE.Vector3();
  switch(moveType) {
    case "forward":
      direction.set(Math.sin(angle), 0, Math.cos(angle));
      break;
    case "backward":
      direction.set(-Math.sin(angle), 0, -Math.cos(angle));
      break;
    case "left":
      direction.set(Math.cos(angle), 0, -Math.sin(angle));
      break;
    case "right":
      direction.set(-Math.cos(angle), 0, Math.sin(angle));
      break;
  }
  return direction;
}

// 处理碰撞和移动
function handleCollisionAndMovement(playerState, controls, scene, camera, cameraAngle, delta) {
  const { moveForward, moveBackward, moveLeft, moveRight, speed } = playerState;
  
  // 前进检测
  if (moveForward) {
    const direction = getMovementDirection(cameraAngle, 'forward');
    if (!checkCollision(camera.position, direction, scene, 0.3)) {
      controls.moveForward(speed * delta);
    }
  }
  
  // 后退检测
  if (moveBackward) {
    const direction = getMovementDirection(cameraAngle, 'backward');
    if (!checkCollision(camera.position, direction, scene, 0.3)) {
      controls.moveForward(-speed * delta);
    }
  }
  
  // 左移检测
  if (moveLeft) {
    const direction = getMovementDirection(cameraAngle, 'left');
    if (!checkCollision(camera.position, direction, scene, 0.3)) {
      controls.moveRight(-speed * delta);
    }
  }
  
  // 右移检测
  if (moveRight) {
    const direction = getMovementDirection(cameraAngle, 'right');
    if (!checkCollision(camera.position, direction, scene, 0.3)) {
      controls.moveRight(speed * delta);
    }
  }
} 