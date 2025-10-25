import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BombUI')
export class BombUI extends Component {

    @property(Label)
    private bombCountLabel: Label = null;

    private gameManager: GameManager = null;

    protected onLoad(): void {
        this.gameManager = GameManager.getInstance();
    }


    start() {

    }

    update(deltaTime: number) {
        this.bombCountLabel.string = this.gameManager.bombCount.toString();
    }
}

