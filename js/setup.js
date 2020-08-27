import bunny from 'img/bunny.png'
import mapbackground from 'img/motherboard.png'
import floortileset from 'img/floortileset.png'
import * as PIXI from 'pixi.js'
import TowerManagement from './TowerManagement'
import {UIWave} from './UIWave'
import LevelManagement from './level'

import { towers } from '../js/towerObject'

let app;
let texture;
let container;
let rect;
let world;
let tileTextures;
var timer = 0;

const tileSize = 32;
const mapSize = 8;
const interactiveTile = 6;

let displayMenu = false;


export const setup = () => {
  app = new PIXI.Application({ backgroundColor: 0x1099bb, width: 920, height: 640 });
  document.body.appendChild(app.view);

  // console.log('money: ', LEVEL.LevelManagement.getMoney())
  
  // $("#daGame").append(app.view);

  // $("#inputPanel").fadeOut();
// function lost() {
//     $("#points").text("You have won " + score + " points! Well played");
//     $("#inputPanel").fadeIn();
// }

// function resetGame() {
//     //enemy settings
//     enemyHP = 40;
//     enemySpeed = 11;
//     enemiesN = 6;
//     enemyID = 0;

//     //ui elements
//     health = 100;
//     money = 500;
//     score = 0;
// }

// $("#submit").on("click", function () {
//     addNewScore($("#name").val(), score);
//     resetGame();
//     $("#inputPanel").fadeOut();
// });

// $("#newGame").on("click", function () {
//     $("#inputPanel").fadeOut();
//     resetGame();
// });

// $(".glyphicon").on("click", function () {
//     if ($(this).hasClass("glyphicon-volume-off")) {
//         $(this).removeClass("glyphicon-volume-off");
//         $(this).addClass("glyphicon-volume-up");
//         // soundTrack.stop();
//     } else {
//         $(this).removeClass("glyphicon-volume-up");
//         $(this).addClass("glyphicon-volume-off");
//         console.log("vlez");
//         // soundTrack.play();
//     }
// });
  
  // **** SET BACKGROUND MAP ******
  var map = new PIXI.Sprite(PIXI.Texture.from(mapbackground));
  app.stage.addChild(map);
  // **** SET BACKGROUND MAP ******

  // **** SET WAVE BUTTON ******
  var newWave = new UIWave(app);

  app.stage.addChild(newWave.sprite);
  // **** SET WAVE BUTTON ******

  var pause = new PIXI.Sprite(PIXI.Texture.from(bunny));
  pause.interactive = true;
  pause.buttonMode = true;
  pause.position.x = 100;
  pause.position.y = 100
  pause.on('mousedown', () => {
    if(app.ticker.started === true) {
      app.ticker.stop()
      console.log('bunny', app.ticker)
    } else {
      app.ticker.start()
    }
   
  })
  app.stage.addChild(pause);

  // **** SET UP TOWERS ******
  console.log('towers', towers.towers.t1)
  var Towers = [new TowerManagement(towers.towers.t1, app), new TowerManagement(towers.towers.t2, app), new TowerManagement(towers.towers.t3, app)];

  for (var i = 0; i < Towers.length; i++) {
    Towers[i].placeSprite()
    app.stage.addChild(Towers[i].text);
    // app.stage.addChild(Towers[i].tooltip);
  }
  // **** SET UP TOWERS ******

  var healthText = new PIXI.Text(LevelManagement.getHealth(), { font: "30px Galindo", fill: "#d6c069" });
  healthText.position.x = 64 * 10 + 30;
  healthText.position.y = 10;
  app.stage.addChild(healthText);
  var textMoney = new PIXI.Text(LevelManagement.getMoney(), { font: "30px Galindo", fill: "#d6c069" });
  textMoney.position.x = 64 * 10 + 30;
  textMoney.position.y = 50;
  app.stage.addChild(textMoney);
  var scoreText = new PIXI.Text(LevelManagement.getScore(), { font: "35px Galindo", fill: "#d6c069" });
  scoreText.position.x = 64 * 10 + 30;
  scoreText.position.y = 465;
  app.stage.addChild(scoreText);

  for(var i = 0; i < 640; i++) {
    var x = new PIXI.Text(".", {fill: "#d6c069" });
    var y = new PIXI.Text(".");
    x.position.x = 576;
    x.position.y = 64;
    // y.position.x = i;
    // x.position.y = i;
    app.stage.addChild(x);
    // app.stage.addChild(y);
  }

  var y = new PIXI.Text(".");
  y.position.x = 0;
    x.position.y = 0;
    app.stage.addChild(y);

  // requestAnimationFrame(animate);
  app.ticker.add(animate)
function animate () {
    LevelManagement.getEnemies().sort(function (a, b) {
        return a.traveled - b.traveled;
    });
    for (var i = 0; i < Towers.length; i++) {
        if (Towers[i].price <= LevelManagement.getMoney()) {
            Towers[i].dimOut();
        } else {
            Towers[i].dim();
        }
    }
    timer++;
    timer = timer % 1000;
    // timer = app.ticker.deltaTime
    // console.log('timer', timer)

    healthText.text = "Health: " + LevelManagement.getHealth()
    textMoney.text = "Money: " + LevelManagement.getMoney();
    scoreText.text = "Score: " + LevelManagement.getScore();
  

    for (var i = 0; i < LevelManagement.getTowers().length; i++) {
      LevelManagement.getTowers()[i].getTarget(LevelManagement.getEnemies().length - 1);
        if (timer % LevelManagement.getTowers()[i].shootSpeed == 0 && LevelManagement.getTowers()[i].target != null) LevelManagement.getTowers()[i].shootTarget();
    }

    for (var i = 0; i < LevelManagement.getEnemies().length; i++) {
      LevelManagement.getEnemies()[i].move();
      // LevelManagement.getEnemies()[i].clearRange();
      
    }

    for (var i = 0; i < LevelManagement.getBulletsArray().length; i++) {
      LevelManagement.getBulletsArray()[i].travel();
    }

    if (LevelManagement.getEnemies().length === 0) {
        for (var i = 0; i < LevelManagement.getBulletsArray().length; i++) {
          LevelManagement.getBulletsArray()[i].destroy();
        }
    }
    if (LevelManagement.getHealth() <= 0) {
        for (var i = 0; i < LevelManagement.getEnemies().length; i++) {
          LevelManagement.getEnemies()[i].Die();
        }
        LevelManagement.setHealth();
        lost();
    }

    if (LevelManagement.getEnemies().length != 0) {
        if (LevelManagement.getEnemies()[LevelManagement.getEnemies().length - 1].traveled > 750) {
            newWave.sprite.interactive = true;
            newWave.sprite.alpha = 1;
        }
        else {
            newWave.sprite.interactive = false;
            newWave.sprite.alpha = 0.5;
        }
    }
    if (LevelManagement.getHealth() === 0) {
        newWave.sprite.interactive = false;
        newWave.sprite.alpha = 0.5;
    }
    if (LevelManagement.getEnemies().length === 0) {
        newWave.sprite.interactive = true;
        newWave.sprite.alpha = 1;
    }

    // renderer.render(stage);
    // requestAnimationFrame(animate);
}


  // container = new PIXI.Container();
  // container.interactive = true;
  // container.hitArea = new PIXI.Rectangle(0, 0, 600, 600);

  // container.click = clickToPlace;
  // let rect = new PIXI.Graphics();
  // rect.beginFill(0xFF000);
  // rect.drawRect(0, 0, app.view.width, app.view.height);
  // container.addChild(rect);
  // container.visible = false;
  // console.log('container', container)

  // app.stage.addChild(container);

  


  // create a texture from an image path
  // texture = PIXI.Texture.from(bunny);
  // console.log("setup -> texture", texture)
  // const txt = PIXI.Texture.from(towerOne)
  // console.log("setup -> txt", txt)
  
  // app.loader.add('tileset', floortileset);
  // app.loader.load(() => {
  //   createTileMap();
  //   createWorldMap();
  

    
    // console.log("setup -> TowerManagements", TowerManagements)

    // app.stage.addChild(tesb);
    // var testSprite = new TowerManagement(towers.towers.t1, app)

    
    // app.stage.addChild(testSprite.sprite)
    
    
    

  //   app.stage.addChild(world);
  // });
  // app.loader.onComplete.add(createTileMap);

  // const test = new TowerManagement("images/PNG/3.png", 720, 175, 100, 100, 150, 100, "A somewhat slower\nbut powerfull tower!")
  // console.log('test', test)
  // Scale mode for pixelation
  // texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  // window.addEventListener("click", clickToPlace);

  // for (let i = 0; i < 10; i++) {
  //   createBunny(
  //     Math.floor(Math.random() * app.screen.width),
  //     Math.floor(Math.random() * app.screen.height),
  //   );
  // }
}

const createTileMap = () => {
  tileTextures = [];
  for (let i = 0; i < mapSize * mapSize; i++) {
    let x = i % mapSize;
    let y = Math.floor(i / mapSize);
    tileTextures[i] = new PIXI.Texture(
      app.loader.resources.tileset.texture,
      new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
    );

  }
}

const createWorldMap = () => {
  world = new PIXI.Container();
  for (let y = 0; y < map.width; y++) {
    for (let x = 0; x < map.width; x++) {
      let tile = map.tiles[y * map.width + x];
      
      let sprite = new PIXI.Sprite(tileTextures[tile]);
      sprite.x = x * tileSize;
      sprite.y = y * tileSize;
      if(tile === 6) {
        makeTileInteractive(sprite)
      }
      world.addChild(sprite);
    }

  }
}

const makeTileInteractive = (tile) => {
  tile.interactive = true;
  tile.buttonMode = true;
  tile.on('pointerdown', displayTowerMenu)  
}

const displayTowerMenu = (e) => {
  console.log('display tower', e)
  displayMenu = !displayMenu
  console.log('displayMenu', displayMenu)
  let container = buildTowerMenu(e)
  container.visible = displayMenu;

  app.stage.addChild(container);
}

const buildTowerMenu = (e) => {
  if(container === undefined) {
    container = new PIXI.Container();
    container.interactive = true;
    rect = new PIXI.Graphics();
    rect.beginFill(0xFF000);
    let tower = createTower()
    rect.addChild(tower)
    rect.drawRect(e.data.global.x, e.data.global.y, 100, 50);
    container.addChild(rect);
  }
 
  if(displayMenu === true && container !== undefined) {
    container.removeChildAt(0)
    rect.destroy({children:true, texture:true, baseTexture:true})
    rect = new PIXI.Graphics();
    rect.beginFill(0xFF000);
    let tower = createTower()
    rect.addChild(tower)
    rect.drawRect(e.data.global.x, e.data.global.y, 100, 50);
    container.addChild(rect);
  }
  
  return container
}

const createTower = () => {
  texture = PIXI.Texture.from(towerOne);
  const tower = new PIXI.Sprite(texture);
  tower.interactive = true
  tower.buttonMode = true
  tower.on('pointerdown', displayTowerMenu)
  return tower
}



function createBunny (x, y) {
  console.log('creat bunny', x)
  // create our little bunny friend..
  const bunny = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  bunny.buttonMode = true;

  // center the bunny's anchor point
  bunny.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  bunny.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  bunny
    .on('pointerdown', clickToPlace)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  // For mouse-only events
  // .on('mousedown', onDragStart)
  // .on('mouseup', onDragEnd)
  // .on('mouseupoutside', onDragEnd)
  // .on('mousemove', onDragMove);

  // For touch-only events
  // .on('touchstart', onDragStart)
  // .on('touchend', onDragEnd)
  // .on('touchendoutside', onDragEnd)
  // .on('touchmove', onDragMove);

  // move the sprite to its designated position
  bunny.x = x;
  bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);
}

const clickToPlace = (e) => {
  console.log('clicked', e.data.global.x);
  createBunny(e.data.global.x, e.data.global.y);
}


function onDragStart (event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd () {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove () {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}

