import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property
    enemy0SpawnSpeed: number = 1;
    @property(Prefab)
    enemy0Prefab: Prefab = null;

    @property
    enemy1SpawnSpeed: number = 3;
    @property(Prefab)
    enemy1Prefab = null;

    @property
    enemy2SpawnSpeed: number = 10;
    @property(Prefab)
    enemy2Prefab: Prefab = null;

    private static instance: EnemyManager = null;

    public static getInstance(): EnemyManager {
        return EnemyManager.instance;
    }
    
    protected onLoad(): void {
        EnemyManager.instance = this;
    }

    start() {
        this.schedule(this.spawnEnemy0, this.enemy0SpawnSpeed);
        this.schedule(this.spawnEnemy1, this.enemy1SpawnSpeed);
        this.schedule(this.spawnEnemy2, this.enemy2SpawnSpeed);
    }
    protected onDestroy(): void {
        this.unschedule(this.spawnEnemy0);
        this.unschedule(this.spawnEnemy1);
        this.unschedule(this.spawnEnemy2);
    }

    update(deltaTime: number) {
        
    }

    spawnEnemy0() {
        this.execSpawnEnemy(this.enemy0Prefab, -215, 215, 450);
    }
    spawnEnemy1() {
        this.execSpawnEnemy(this.enemy1Prefab, -200, 200, 470);
    }
    spawnEnemy2() {
        this.execSpawnEnemy(this.enemy2Prefab, -155, 155, 560);
    }

    private execSpawnEnemy(prefab: Prefab, minX: number, maxX: number, y: number) {
        const enemy: Node = instantiate(prefab);
        this.node.addChild(enemy);
        enemy.setPosition(math.randomRangeInt(minX, maxX), y);
    }

    public getAllEnemies(): Enemy[] {
        const enemies: Enemy[] = [];
        this.node.children.forEach(child => {
            const enemy: Enemy = child.getComponent(Enemy);
            if (enemy != null && enemy.getHP() > 0) {
                enemies.push(enemy);
            }
        });
        return enemies;
    }
        
}

