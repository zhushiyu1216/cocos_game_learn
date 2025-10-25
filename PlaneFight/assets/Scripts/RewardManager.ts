import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RewardManager')
export class RewardManager extends Component {

    @property
    reward1SpawSpeed: number = 3;
    @property
    reward2SpawSpeed: number = 5;

    @property(Prefab)
    reward1Prefab: Prefab = null;
    @property(Prefab)
    reward2Prefab: Prefab = null;

    @property(Node)
    rewardContainer: Node = null;

    protected onLoad(): void {
        this.schedule(this.spawReward1, this.reward1SpawSpeed);
        this.schedule(this.spawReward2, this.reward2SpawSpeed);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        this.unschedule(this.spawReward1)
    }

    private spawReward1() {
        this.execSpaw(this.reward1Prefab, -205, 205, 475);
    }

    private spawReward2() {
        this.execSpaw(this.reward2Prefab, -200, 200, 485);
    }

    private execSpaw(prefab:Prefab, minX: number, maxX: number, y: number) {
        const reward = instantiate(prefab)
        reward.setPosition(math.randomRangeInt(minX, maxX), y);
        this.rewardContainer.addChild(reward)
    }
}

