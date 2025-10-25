import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    speed: number = 500;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        if (pos.y > 440) {
            this.node.destroy();
        } else {
            this.node.setPosition(pos.x, pos.y + this.speed * deltaTime);
        }
        
    }
}

