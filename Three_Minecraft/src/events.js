//===事件===

import * as THREE from "three";

export function initEventListeners(
  controls,
  scene,
  camera,
  blockSystem,
  playerState
) {
  // UI事件
  initBlockSelectionUI(blockSystem);

  // 鼠标事件
  document.addEventListener("click", (event) =>
    handleClick(event, controls, scene, camera, blockSystem, playerState)
  );

  // 键盘事件
  document.addEventListener("keydown", (event) =>
    handleKeyDown(event, playerState, blockSystem)
  );
  document.addEventListener("keyup", (event) =>
    handleKeyUp(event, playerState)
  );
}

// 初始化方块选择UI
function initBlockSelectionUI(blockSystem) {
  document.querySelectorAll(".block-option").forEach((option) => {
    const type = option.dataset.type;
    option.style.backgroundImage = `url(/textures/blocks/${type}.png)`;
    option.addEventListener("click", () => {
      blockSystem.selectedBlockType = type;
      blockSystem.updateBlockSelection(type);
    });
  });
}
// 鼠标点击事件
function handleClick(event, controls, scene, camera, blockSystem, playerState) {
  if (!controls.isLocked) {
    controls.lock();
    document.getElementById("crosshair").style.display = "block";
    return;
  }
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(
    (window.innerWidth / 2 / window.innerWidth) * 2 - 1,
    (-window.innerHeight / 2 / window.innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    if (event.button === 2) {
      // 右键放置方块
      const position = intersect.object.position
        .clone()
        .add(intersect.face.normal);
      const blockBox = new THREE.Box3();
      blockBox.setFromCenterAndSize(position, new THREE.Vector3(1, 1, 1));
      playerState.boundingBox.setFromCenterAndSize(
        camera.position,
        new THREE.Vector3(
          playerState.width * 0.8,
          playerState.height,
          playerState.width * 0.8
        )
      );
      if (!blockBox.intersectsBox(playerState.boundingBox)) {
        const block = blockSystem.blockManager.createBlock(
          blockSystem.selectedBlockType,
          position
        );
        scene.add(block);
      }
    } else if (event.button === 0) {
      // 左键破坏方块
      scene.remove(intersect.object);
    }
  }
}

// 键盘按下事件
function handleKeyDown(event, playerState, blockSystem) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      playerState.moveForward = true;
      break;
    case "ArrowDown":
    case "KeyS":
      playerState.moveBackward = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      playerState.moveLeft = true;
      break;
    case "ArrowRight":
    case "KeyD":
      playerState.moveRight = true;
      break;
    case "Space":
      if (playerState.canJump) {
        playerState.velocity.y = 10;
        playerState.canJump = false;
      }
      break;
    // 选择方块类型
    case "Digit1":
      blockSystem.selectedBlockType = BlockType.GRASS;
      blockSystem.updateBlockSelection(BlockType.GRASS);
      break;
    case "Digit2":
      blockSystem.selectedBlockType = BlockType.DIRT;
      blockSystem.updateBlockSelection(BlockType.DIRT);
      break;
    case "Digit3":
      blockSystem.selectedBlockType = BlockType.STONE;
      blockSystem.updateBlockSelection(BlockType.STONE);
      break;
  }
}

// 键盘抬起事件
function handleKeyUp(event, playerState) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      playerState.moveForward = false;
      break;
    case "ArrowDown":
    case "KeyS":
      playerState.moveBackward = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      playerState.moveLeft = false;
      break;
    case "ArrowRight":
    case "KeyD":
      playerState.moveRight = false;
      break;
  }
}
