import Phaser from 'phaser'

export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);

      // Game attributes

      this.active = false;
  
      // Nadanie piłce właściwości fizycznych
      this.setImmovable(true);
      this.setBounce(1); // Ustawienie odbicia na 100%
      this.setCollideWorldBounds(true); // Kolizje z granicami świata
      // this.setVelocity(200, 200); // Prędkość piłki (x, y)
      this.setScale(0.75)

    }

    updateStatic() {
      if(this.active === true) return;
      else {
        this.x = this.scene.paddle.x;

      }

    }

    makeActive()
    {
      this.setImmovable(false);
      this.setGravity(5)
      this.setVelocity(50, -200)
    }

    checkBottomBound()
    {
      if(this.y >= this.scene.game.CONFIG.width - this.width)
      {
          this.scene.cameras.main.setBackgroundColor(0x000000);
          this.destroy();
      }
    }

  }