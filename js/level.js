let money = 500;
const towers = [];
const enemies = [];
let health = 100;
let score = 0;
let enemyHP = 40;
let enemySpeed = 11;
let enemiesN = 6;
let enemyID = 0;
let bullets = []

export default class LevelManagement {
  constructor(money) {
    this.money = money
  }

  static getMoney() {
    return money
  }

  static updateMoney(price) {
    return money -= price
  }
  
  static increaseMoney(price) {
    return money += price
  }
  
  static getScore() {
    return score
  }
  
  static updateScore(points) {
    return score += points
  }
  
  static getHealth() {
    return health
  }
  
  static minusHealth() {
    return health--;
  }
  
  static getEnemies() {
    return enemies
  }
  
  static getEnemyHP() {
    return enemyHP
  }
  
  static getEnemySpeed() {
    return enemySpeed
  }
  
  static getEnemniesN() {
    return enemiesN
  }
  
  static getEnemyId() {
    return enemyID
  }
  
  static getBulletsArray() {
    return bullets
  }
  
  static getTowers() {
    return towers
  }
  
  static increaseEnemyHP(number) {
    return enemyHP += number
  }
  
  static increaseEnempySpeed(number) {
    return enemySpeed *= number
  }
  
  static increaseEnemiesN(number) {
    return enemiesN += number
  }
  
  static increaseEnemyID() {
    return enemyID++
  }
  
  static setHealth() {
    return health = 0
  }
  
}

// export const getMoney = () => {
//   return money
// }

// export const updateMoney = (price) => {
//   return money -= price
// }

// export const increaseMoney = (price) => {
//   return money += price
// }

// export const getScore = () => {
//   return score
// }

// export const updateScore = (points) => {
//   return score += points
// }

// export const getHealth = () => {
//   return health
// }

// export const minusHealth = () => {
//   return health--;
// }

// export const getEnemies = () => {
//   return enemies
// }

// export const getEnemyHP = () => {
//   return enemyHP
// }

// export const getEnemySpeed = () => {
//   return enemySpeed
// }

// export const getEnemniesN = () => {
//   return enemiesN
// }

// export const getEnemyId = () => {
//   return enemyID
// }

// export const getBulletsArray = () => {
//   return bullets
// }

// export const getTowers = () => {
//   return towers
// }

// export const increaseEnemyHP = (number) => {
//   return enemyHP += number
// }

// export const increaseEnempySpeed = (number) => {
//   return enemySpeed *= number
// }

// export const increaseEnemiesN = (number) => {
//   return enemiesN += number
// }

// export const increaseEnemyID = () => {
//   return enemyID++
// }

// export const setHealth = () => {
//   return health = 0
// }

