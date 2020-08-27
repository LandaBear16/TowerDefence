import * as PIXI from 'pixi.js'
import wave from 'img/newWaveButton.png'
import LevelManagement from './level'
import {Enemy} from './Enemy'

export class UIWave{
  constructor(app) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(wave));
    this.sprite.position.x = 64 * 10 + 10;
    this.sprite.position.y = 540;
    this.sprite.scale.y = 0.8;
    this.sprite.interactive = true;
    this.app = app
    this.setup()
  }
  
  setup() {
    this.sprite.on('mousedown', () => {
      this.app.ticker.start()
      if (this.sprite.interactive) {
        if (LevelManagement.getHealth() > 0) {
          LevelManagement.increaseEnemyHP(10);
          LevelManagement.increaseEnempySpeed(0.95)
          LevelManagement.increaseEnemiesN(2)
          for (var i = 0; i < LevelManagement.getEnemniesN(); i++) {
              var enemy = new Enemy(64 * 9, (64 - (20 * LevelManagement.getEnemniesN())) + (i * 20), LevelManagement.getEnemyHP(), LevelManagement.getEnemySpeed(), LevelManagement.getEnemyId(), this.app);
              
              LevelManagement.getEnemies().push(enemy);
              this.app.stage.addChild(enemy.sprite);
              LevelManagement.increaseEnemyID();
          }
        }
        this.sprite.interactive = false;
        this.sprite.alpha = 0.5;
    }
    })
  }
};