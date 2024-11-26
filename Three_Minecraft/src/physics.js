//===射线检测===
import * as THREE from "three";
const raycaster = new THREE.Raycaster();
// 检测射线是否与场景中的物体发生碰撞
export function checkCollision(origin, direction, scene, distance) {
  raycaster.set(origin, direction.normalize());
  const intersects = raycaster.intersectObjects(scene.children).filter(intersect => 
    Math.abs(intersect.object.position.y - origin.y) < 0.5
  );
  return intersects.length > 0 && intersects[0].distance <= distance;
}
// 检测射线是否与地面发生碰撞
export function checkGroundCollision(origin, scene) {
  const direction = new THREE.Vector3(0, -1, 0);
  raycaster.set(origin, direction);
  const intersects = raycaster.intersectObjects(scene.children).filter(intersect => 
    intersect.object.position.y < origin.y
  );
  return intersects.length > 0 && intersects[0].distance <= 0.2;
} 