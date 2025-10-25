import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bg')
export class Bg extends Component {

    @property(Node)
    public bg01: Node = null;
    @property(Node)
    public bg02: Node = null;

    @property
    speed: number = 100;

    start() {

    }

    update(deltaTime: number) {
        let pos1 = this.bg01.position;
        this.bg01.setPosition(pos1.x, pos1.y - this.speed * deltaTime)
        let pos2 = this.bg02.position;
        this.bg02.setPosition(pos2.x, pos2.y - this.speed * deltaTime)

        if (this.bg01.position.y < -852) {
            this.bg01.setPosition(pos1.x, 0)
            this.bg02.setPosition(pos2.x, 852)
        }
    }
}

