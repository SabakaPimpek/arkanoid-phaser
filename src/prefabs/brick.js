import Phaser from 'phaser'
import PowerUp from '../prefabs/powerup';

export default class Brick extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;

    // Game attributes

    this.health = 1;
    this.width = 80;
    this.height = 40;

    //

    scene.add.existing(this);
    scene.physics.add.existing(this);
    // this.body.setImmovable(true);

    // this.create();
  }

  create() {
   
  }

  hit() {
    // Points are added in "play" scene function hitBrick, change if needed
    this.health--;

    this.scene.gamePoints += 500;
    this.scene.updateUI();

    if(this.health <= 0) {
      this.destroy();
    }
  }

  static addBrickRow(scene, brickCount, brickColor, startX, startY, paddingX) {
    const brickGroup = [];

    for (let i = 0; i < brickCount; i++) {
      const x = startX + i * (90 + paddingX);
      const y = startY;

      const brick = new Brick(scene, x, y, brickColor);
      brickGroup.push(brick);
    }
    
    return brickGroup;
  }

}