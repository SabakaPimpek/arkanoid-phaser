import Phaser from 'phaser'

export default class Paddle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setImmovable(true);

      this.maxSpeed = 1000;
      this.scene = scene;

      this.prevMouseX = scene.mouseX;

      this.setCollideWorldBounds(true);
      this.setOrigin(0.5);

    }

    updatePosition() {

      if(this.scene.mouseX - 8 > this.x)
      {
        this.setVelocityX(this.maxSpeed);
      }
      else if(this.scene.mouseX + 8 < this.x)
      {
        this.setVelocityX(-this.maxSpeed);
      }
      else {
        this.setVelocity(0)
        this.x = this.scene.mouseX
      }
      
    }

  }