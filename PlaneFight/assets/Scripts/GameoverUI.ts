import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameoverUI')
export class GameoverUI extends Component {

    @property(Label)
    private highestScoreLable: Label = null;
    @property(Label)
    private currentScoreLable: Label = null;

    start() {

    }

    update(deltaTime: number) {
        this.currentScoreLable.string = GameManager.getInstance().getScore().toString();
        this.highestScoreLable.string = GameManager.getInstance().getHightestScore().toString();
    }

    public onRestartButtonClick() {
        GameManager.getInstance().restartGame();
    }
}

