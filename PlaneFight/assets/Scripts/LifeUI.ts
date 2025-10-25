import { _decorator, Component, Label, Node } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;



@ccclass('LifeUI')
export class LifeUI extends Component {

    @property(Player)
    player: Player = null;

    @property(Label)
    liftCountLable: Label = null;

    start() {

    }

    update(deltaTime: number) {
        this.liftCountLable.string = this.player.hp.toString()
    }
}

