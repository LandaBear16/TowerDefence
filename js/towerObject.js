import t1 from 'img/t1.png'
import t2 from 'img/t2.png'
import t3 from 'img/t3.png'
// import t1 from 'img/tower1.png'
// import t2 from 'img/tower1.png'
// import t3 from 'img/tower1.png'

export const towers = {
  towers: {
    t1: {
      sprite: t1,
      x: 720,
      y: 175,
      price: 100,
      shootSpeed: 100,
      range: 150,
      damage: 100,
      tooltip: "A somewhat slower\nbut powerfull tower!"
    },
    t2: {
      sprite: t2,
      x: 720,
      y: 278,
      price: 150,
      shootSpeed: 75,
      range: 150,
      damage: 60,
      tooltip: "A fast mashinegun\nbut lacks the power!"
    },
    t3: {
      sprite: t3,
      x: 720,
      y: 392,
      price: 500,
      shootSpeed: 300,
      range: 500,
      damage: 1000,
      tooltip: "The sniper\nKills instant from far!"
    }
  }
}