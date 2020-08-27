import * as PIXI from 'pixi.js'
import { Tower } from './tower'
import { stageMatrix } from './matrix'
import LevelManagement from './level'
import Vector  from './Vector'

export default class TowerManagement {
  constructor({sprite, x, y, price, shootSpeed, range, damage}, app) {
    this.text = new PIXI.Text(price)
    this.texture = new PIXI.Texture.from(sprite)
    this.sprite = new PIXI.Sprite(this.texture)
    this.range = range;
    this.damage = damage;
    this.pos = new Vector(x, y)
    this.shootSpeed = shootSpeed;
    this.sprite.position = new Vector(x - 32, y -32)
    this.sprite.pivot = new Vector(32, 32)
    this.spriteLocation = sprite;
    this.price = price;
    this.app = app;
    this.text.position = new Vector(this.pos.x - 50, this.pos.y)
  }

  placeSprite() {
    this.setup()
  }

  setup() {
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    
    this.mousedownEvent()
    this.mouseupEvent()
    this.mousemoveEvent()
    
    this.app.stage.addChild(this.sprite);
  }

  dim() {
    this.sprite.alpha = 0.5;
    this.sprite.interactive = false;
  }

  dimOut() {
    this.sprite.alpha = 1;
    this.sprite.interactive = true;
  }

  mousedownEvent() {
    this.sprite.on('mousedown', (data) => {
      this.data = data;
      this.sprite.alpha = 0.5;
      this.sprite.dragging = true;
    })
  }

  mouseupEvent() {
    this.sprite.on('mouseup', (data) => {
      this.sprite.alpha = 1
      this.sprite.dragging = false;
      console.log('this', this)
      const newPosition = this.data.data.getLocalPosition(this.sprite.parent);
      
      if (LevelManagement.getMoney() >= this.price) {
        if (stageMatrix[Math.floor(newPosition.y / 64)][Math.floor(newPosition.x / 64)] === 1) {
            var tmpX = (Math.floor(newPosition.x / 64) + 1) * 64;
            var tmpY = (Math.floor(newPosition.y / 64) + 1) * 64;

            var t = new Tower(new PIXI.Sprite(PIXI.Texture.from(this.spriteLocation)), tmpX, tmpY, this.shootSpeed, this.range, this.damage, this.app);
            
            t.drawRange()
            LevelManagement.getTowers().push(t);
            this.app.stage.addChild(t.sprite);
            LevelManagement.updateMoney(this.price)
            this.sprite.position.x = this.pos.x - 32;
            this.sprite.position.y = this.pos.y - 32;
            stageMatrix[Math.floor(newPosition.y / 64)][Math.floor(newPosition.x / 64)] = 0;
        } else {
            this.sprite.position.x = this.pos.x - 32;
            this.sprite.position.y = this.pos.y - 32;
        }
    } else {
        this.sprite.position.x = this.pos.x - 32;
        this.sprite.position.y = this.pos.y - 32;
    }
    this.data = null;
    })
  }

  mousemoveEvent() {
    this.sprite.on('mousemove', () => {
      if (this.sprite.dragging) {
        const newPosition = this.data.data.getLocalPosition(this.sprite.parent);
        this.sprite.position.x = newPosition.x;
        this.sprite.position.y = newPosition.y;
      }
    })
    
  }
}

