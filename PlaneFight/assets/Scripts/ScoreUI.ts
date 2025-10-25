import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('ScoreUI')
export class ScoreUI extends Component {

    @property(Label)
    private score: Label = null;

    start() {

    }

    update(deltaTime: number) {
        this.score.string = GameManager.getInstance().getScore().toString();
    }
}

