import { _decorator, AudioClip, Component, director, EventTouch, Input, input, math, Node } from 'cc';
import { EnemyManager } from './EnemyManager';
import { Enemy } from './Enemy';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance: GameManager = null;

    @property
    private bombCount: number = 0;
    @property
    private score: number = 0;
    @property(Node)
    private gameoverUI: Node = null;
    @property(AudioClip)
    private backgroundMusic: AudioClip = null;

    private lastClickTime: number = 0;

    protected onLoad(): void {
        GameManager.instance = this
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        AudioMgr.inst.play(this.backgroundMusic, 0.3, true);
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
    
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        AudioMgr.inst.stop();
    }

    public static getInstance(): GameManager {
        return GameManager.instance;
    }

    public rewardBomb() {
        this.bombCount += 1;
    }

    public useBomb() {
        if (this.bombCount > 0) {
            this.bombCount += 1;
        }
    }

    public addScore(score: number) {
        this.score += score;
    }

    public getScore(): number {
        return this.score;
    }

    public getHightestScore(): number {
        return parseInt(localStorage.getItem('highestScore') || '0');
    }

    public stopGame() {
        this.gameoverUI.active = true;
        localStorage.setItem('highestScore', math.absMax(this.score, this.getHightestScore()).toString());
    }

    public restartGame() {
        this.gameoverUI.active = false;
        director.loadScene(director.getScene().name)
    }

    private onTouchEnd(event: EventTouch) {
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastClickTime;
        this.lastClickTime = currentTime;
        if (timeDiff < 300) {
            EnemyManager.getInstance().getAllEnemies().forEach((element:Enemy) => {
                element.die();
            });
        }
    }
}

