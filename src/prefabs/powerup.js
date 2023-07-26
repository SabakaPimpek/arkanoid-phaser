import Phaser from 'phaser'

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, powerId) {
    super(scene, x, y, texture);

    this.scene = scene;

    // Game attribute
        this.powerId = powerId;
    //

    this.setFrame(powerId);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2.5)

    //Velocity and SetImmovable are in play scene function
  }

}