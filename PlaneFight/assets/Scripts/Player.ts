import { _decorator, Component, EventTouch, Node, input, Input, Animation, Prefab, instantiate, Collider2D, Contact2DType, IPhysics2DContact, director, AnimationStateEventType, AudioClip } from 'cc';
import { Reward } from './Reward';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;


enum ShootType {
    Normal,
    Double
};

@ccclass('Player')
export class Player extends Component {
    @property
    shootSpeed: number = 0.5;
    shootTimer: number = 0;

    @property(Prefab)
    bullet1Prefab: Prefab = null;
    @property(Node)
    bulletContainer: Node = null;
    @property(Node)
    shootPosNode: Node = null;

    @property
    public shootType: ShootType = ShootType.Normal;
    @property(Prefab)
    doubleBulletPrefab: Prefab = null;
    @property(Node)
    doubleShootPos1Node: Node = null;
    @property(Node)
    doubleShootPos2Node: Node = null;

    @property(Animation)
    anim: Animation = null;

    @property
    hp: number = 1;

    @property
    hitAnimName: string = '';
    @property
    explodeAnimName: string = '';

    collider: Collider2D = null;

    isUnattackable: boolean = false;

    @property(AudioClip)
    shootAudio: AudioClip = null;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        director.getScene().on("rewardDoubleShoot", this.onRewardBoubleShoot, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        if (director.getScene() != null) {
            director.getScene().off("rewardDoubleShoot", this.onRewardBoubleShoot, this);
        }
    }

    onTouchMove(event: EventTouch) {
        const pos = this.node.position;
        let posX = Math.min(230, Math.max(-230, pos.x + event.getDeltaX()));
        let posY = Math.min(375, Math.max(-425, pos.y + event.getDeltaY()));
        this.node.setPosition(posX, posY);
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.hp <= 0) {
            return;
        }
        
        this.shootTimer += deltaTime;
        if (this.shootTimer >= this.shootSpeed) {
            this.shootTimer = 0;
            switch (this.shootType) {
                case ShootType.Normal:
                    this.normalShoot();
                    break;
                case ShootType.Double:
                    this.doubleShoot();
                    break;
            }
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.getComponent(Reward) != null) {
            return;
        }

        if (this.isUnattackable) {
            return;
        }
        this.hp -= 1;
        if (this.hp > 0) {
            this.anim.play(this.hitAnimName);
        } else {
            this.anim.play(this.explodeAnimName);
            let collider = this.getComponent(Collider2D);
            if (collider) {
                collider.enabled = false;
            }
            this.anim.on(Animation.EventType.FINISHED, ()=>{
                GameManager.getInstance().stopGame();
            }, this);
        }

        this.isUnattackable = true
        this.scheduleOnce(()=>{
            this.isUnattackable = false
        }, 1)
    }

    normalShoot() {
        const bullet = instantiate(this.bullet1Prefab);
        this.bulletContainer.addChild(bullet);
        bullet.setWorldPosition(this.shootPosNode.getWorldPosition());
        AudioMgr.inst.playOneShot(this.shootAudio, 0.5);
    }

    doubleShoot() {
        const bullet1 = instantiate(this.doubleBulletPrefab);
        const bullet2 = instantiate(this.doubleBulletPrefab);
        this.bulletContainer.addChild(bullet1);
        this.bulletContainer.addChild(bullet2);
        bullet1.setWorldPosition(this.doubleShootPos1Node.getWorldPosition());
        bullet2.setWorldPosition(this.doubleShootPos2Node.getWorldPosition());
        AudioMgr.inst.playOneShot(this.shootAudio, 0.5);
    }

    private revertShootType() {
        this.shootType = ShootType.Normal;
    }

    private onRewardBoubleShoot() {
        this.shootType = ShootType.Double
        const that:Player = this
        this.unschedule(this.revertShootType);
        this.scheduleOnce(this.revertShootType, 3);
    }
}

