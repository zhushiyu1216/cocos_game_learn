import { _decorator, Animation, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { Player } from './Player';
import { Bullet } from './Bullet';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property
    public speed: number = 300;

    @property(Animation)
    explodeAnim: Animation = null;

    @property
    private hp: number = 1;

    @property
    hitAnimName: string = '';
    @property
    explodeAnimName: string = '';

    @property
    private score: number = 100;

    public getHP(): number {
        return this.hp;
    }


    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.explodeAnim.on(Animation.EventType.FINISHED, this.explodeAnimFinished, this)
    }

    update(deltaTime: number) {
        if (this.hp > 0) {
            this.node.y -= this.speed * deltaTime;
        }
        if (this.node.y < -580) {
            this.node.destroy();
        }
    }

    private explodeAnimFinished () {
        this.node.destroy();
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.hp -= 1;
        if (this.hp > 0) {
            this.explodeAnim.play(this.hitAnimName);
        } else {
            this.die();
        }
        
        if (otherCollider.getComponent(Bullet) != null) {
            otherCollider.enabled = false;
            this.scheduleOnce(() => {
                otherCollider.node.destroy();
            });
            
        }
    }

    public die() {
        this.hp = 0;
        this.explodeAnim.play(this.explodeAnimName);
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.enabled = false;
        }
        GameManager.getInstance().addScore(this.score);
    }

    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact');
    }

    protected onDestroy(): void {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.explodeAnim.off(Animation.EventType.FINISHED, this.explodeAnimFinished, this);
    }
}

