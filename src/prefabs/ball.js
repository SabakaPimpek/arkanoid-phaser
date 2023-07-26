import Phaser from 'phaser'

export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);


      // Game attributes

      this.maxSpeed = 600;
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

    setActive(bool)
    {
      if(bool === true)
      {
        this.active = true;
        this.setImmovable(false);
        this.setGravity(5)
        this.setVelocity(50, -350)
      }
      else if(bool === false) {
        this.active = false;
        this.setImmovable(true)
        this.setGravity(0)
        this.setVelocity(0)
        this.setY(this.scene.paddle.y-this.scene.paddle.height/2 - 8);
      }

    }

    checkBottomBound()
    {
      if(this.y >= this.scene.game.CONFIG.width - this.width)
      {  
          this.setActive(false);
          this.scene.gameLifes.removeLife();
          this.scene.updateUI();
      }
    }

  }