import * as THREE from 'three';

//===方块类型===
export class BlockType {
    static GRASS = 'grass';
    static DIRT = 'dirt';
    static STONE = 'stone';
}

//===方块管理器===
export class BlockManager {
    constructor() {
        this.blocks = new Map();
        this.textureLoader = new THREE.TextureLoader();
        
        // 加载材质
        const grassTexture = this.textureLoader.load('/textures/blocks/grass.png');
        const dirtTexture = this.textureLoader.load('/textures/blocks/dirt.png');
        const stoneTexture = this.textureLoader.load('/textures/blocks/stone.png');
        
        // 创建材质
        this.materials = {
            [BlockType.GRASS]: new THREE.MeshStandardMaterial({ map: grassTexture }),
            [BlockType.DIRT]: new THREE.MeshStandardMaterial({ map: dirtTexture }),
            [BlockType.STONE]: new THREE.MeshStandardMaterial({ map: stoneTexture })
        };
        
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    createBlock(type, position) {
        const block = new THREE.Mesh(this.geometry, this.materials[type]);
        block.position.copy(position);
        block.userData.type = type;
        return block;
    }
} 