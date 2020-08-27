import * as PIXI from 'pixi.js'
import enemy from 'img/enemy.png'
import LevelManagement from './level'
import { pathMatrix, exampleMatrix } from './matrix'
import Vector  from './collision-detection/Vector'

export class Enemy{
  constructor(x, y, hp, speed, id, app) {
    this.id = id;
    this.traveled = y;
    this.graphic = new PIXI.Graphics();
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(enemy));
    this.x = x;
    this.y = y;
    this.pos = new Vector(x, y)
    this.sprite.position = new Vector(x - 32, y - 32)
    this.sprite.pos = new Vector(x - 32, y - 32)
    this.sprite.pivot.x = 32;
    this.sprite.pivot.y = 32;
    this.hp = hp;
    this.speed = speed
    this.app = app
    this.range = 25
  }

  getRange() {
    return this.range
  }

  drawRange(){
    // const graphics = new PIXI.Graphics();
    this.graphic.lineStyle(2, 0xFEEB77, 1);
    this.graphic.drawCircle(this.pos.x - 32, this.pos.y - 32, this.range);
    this.graphic.endFill();
    this.app.stage.addChild(this.graphic);
  }

  clearRange(){
    this.graphic.moveTo(this.pos.x, this.pos.y)
  }

  toSpriteCoordinates(x, y) {
    this.sprite.position.x = x - 32;
    this.sprite.position.y = y - 32;
  };

  fromSpriteCoordinates(x, y) {
    this.pos.x = x + 32;
    this.pos.y = y + 32;
  };
  position(x, y) {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.fromSpriteCoordinates(x, y);
  };
  move() {
    if (this.sprite.position.y >= 640) {
        LevelManagement.minusHealth()
        this.Die();
        return;
    }
    
    if (this.sprite.position.y < 64) {
        this.fromSpriteCoordinates(this.sprite.position.x, this.sprite.position.y);
        this.toSpriteCoordinates(this.pos.x, this.pos.y + 10 / this.speed);
    } else {
        this.fromSpriteCoordinates(this.sprite.position.x, this.sprite.position.y);
        var dx = pathMatrix[Math.floor(this.pos.y / 64) - 1][Math.floor(this.pos.x / 64) - 1][0] / this.speed;
        var dy = pathMatrix[Math.floor(this.pos.y / 64) - 1][Math.floor(this.pos.x / 64) - 1][1] / this.speed;
        this.toSpriteCoordinates(this.pos.x + dx, this.pos.y + dy);
    }
    this.traveled += (10 / this.speed);
  };
  isDead(bullet) {
    this.hp -= bullet.tower.damage;
    if (this.hp <= 0) {
        this.Die();
        LevelManagement.increaseMoney(10)
        LevelManagement.updateScore(1)
    }
  };
  Die() {
    if ((this.app.stage.getChildIndex(this.sprite) >= 0)) {
        this.app.stage.removeChild(this.sprite);
    }
    for (var i = 0; i < LevelManagement.getEnemies().length; i++) {
        if (LevelManagement.getEnemies()[i].id == this.id) {
          LevelManagement.getEnemies().splice(i, 1);
        }
    }
  };
}