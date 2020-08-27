import * as PIXI from 'pixi.js'
import bullet from 'img/bullet.png'
import LevelManagement from './level'
import Vector from './Vector';

export class Bullet{
  constructor(x, y, target, tower, app) {
    this.traveling = true;
    this.tower = tower;
    this.distanceVector = new Vector(0, 0)
    this.pos = new Vector(x, y)
    this.target = tower.target;
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(bullet));
    this.app = app
    this.range = 10
    this.setSpriteLocation()
  }


  setSpriteLocation() {
    this.sprite.position = new Vector(this.pos.x, this.pos.y)
  }

  checkTarget() {
      if (!this.target) {
          this.target = this.tower.target;
      }
  }
  destroy() {
      if ((this.app.stage.getChildIndex(this.sprite) >= 0)) {
          this.app.stage.removeChild(this.sprite);
      }
      if (LevelManagement.getBulletsArray().indexOf(this) > -1) {
        LevelManagement.getBulletsArray().splice(LevelManagement.getBulletsArray().indexOf(this), 1);
      }
  }
  travel() {
    
      if (this.traveling) {
         
          this.distanceVector = this.tower.sprite.pos.subtr(this.sprite.position)
          
          if ( this.range + this.tower.range + 200 <= this.distanceVector.mag()) {
              this.destroy();
              return;
          }
          if (this.tower.target != null) {
              this.target = this.tower.target;
          }
          if (this.target === null) return;
          var tan = (this.target.sprite.position.y - this.pos.y) / (this.target.sprite.position.x - this.pos.x)
          var angle = Math.atan(tan);
          if (this.target.sprite.position.x < this.pos.x) angle += Math.PI;
          if (this.target.sprite.position.x < (this.pos.x + 2) && this.target.sprite.position.x > (this.pos.x - 2) && this.target.sprite.position.y < (this.pos.y + 2) && this.target.sprite.position.y > (this.pos.y - 2)) {
              this.target.isDead(this);
              this.tower.target = null;
              this.tower.targetIndex = -1;
              this.traveling = false;
              this.destroy();
              return;
          }
          var distance = 4;
          var moveByY = distance * Math.sin(angle);
          var moveByX = distance * Math.cos(angle);
          this.pos.y += moveByY;
          this.pos.x += moveByX;
          this.setSpriteLocation();
      }
  }
}