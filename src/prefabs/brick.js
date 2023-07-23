import Phaser from 'phaser'

export default class Brick extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, color) {
    super(scene, x, y);

    this.scene = scene;
    this.setFillStyle(color);

    // Game attributes

    this.health = 1;
    this.width = 80;
    this.height = 30;

    //

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setImmovable(true);

    this.create();
  }

  create() {
    // Custom initialization logic, if needed
  }

  hit() {
    this.health--;

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

    // brickGroup.children.iterate(brick => {
    //   brick.body.setImmovable(true);
    // });


    return brickGroup;
  }


}