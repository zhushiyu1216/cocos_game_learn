import { _decorator, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Reward')
export class Reward extends Component {

    @property
    speed: number = 150;
    @property
    rewardType: number = 1;
    
    private pendingToDestroy: boolean = false;
    start() {
        const collider = this.getComponent(Collider2D)
        if (collider !== null) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this);
        }
    }

    update(deltaTime: number) {
        if (this.pendingToDestroy) {
            this.node.destroy();
            return;
        }
        const pos = this.node.getPosition();
        this.node.setPosition(pos.x, pos.y - this.speed * deltaTime)

        if (pos.y < -500) {
            this.node.destroy();
        }
    }

    protected onDestroy(): void {
        const collider = this.getComponent(Collider2D)
        if (collider !== null) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.beginContact, this);
        }
    }

    private beginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.rewardType == 1) {
            director.getScene().emit("rewardDoubleShoot");
        } else if (this.rewardType == 2) {
            GameManager.getInstance().rewardBomb();
        }
        this.pendingToDestroy = true
    }
}

