//===方块系统===

import { BlockType, BlockManager } from "./blocks";
import * as THREE from "three";

export function initBlockSystem(scene) {
  const blockManager = new BlockManager();
  
  // 创建初始地面
  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <= 10; z++) {
      const block = blockManager.createBlock(
        BlockType.GRASS,
        new THREE.Vector3(x, -1, z)
      );
      scene.add(block);
    }
  }

  return {
    blockManager,
    selectedBlockType: BlockType.GRASS,
    updateBlockSelection
  };
}
// 更新选中的方块类型
function updateBlockSelection(type) {
  document.querySelectorAll(".block-option").forEach((opt) => {
    opt.classList.remove("selected");
    if (opt.dataset.type === type) {
      opt.classList.add("selected");
    }
  });
} 