import Ball from '../prefabs/ball';
import Paddle from '../prefabs/paddle';
import Brick from '../prefabs/brick';
import Text from '../ui/text';

export default class Play extends Phaser.Scene {
    
    constructor (game)
    {
        super('Play');
        this.game = game;
        this.mouseX = 300
        this.mouseY = 700;
        this.gamePoints = 0;
    }
    
    preload ()
    {

    }
    
    create()
    {

        this.cameras.main.setBackgroundColor(0x6495ED);
        this.paddle = new Paddle(this, this.game.CONFIG.width/2, 700, 'paddle');
        this.ball = new Ball(this, this.paddle.x, this.paddle.y-this.paddle.height/2 - 8, 'ball');
        
        this.title = new Text(
            this,
            this.game.CONFIG.width-160,
            this.game.CONFIG.height-50,
            "Punkty: " + this.gamePoints,
            'preload',
            0.5
        );


       this.getMousePosition();

       this.createBricks();

       this.physics.add.collider(this.ball, this.paddle);
       this.physics.add.collider(this.ball, this.bricks, this.hitBrick);
    }
    
    update()
    {
        this.paddle.updatePosition();
        this.ball.updateStatic();
        this.ball.checkBottomBound();
        this.siki++;
    }

    createBricks()
    {
        this.bricks = this.physics.add.group();
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffc0cb];

        colors.forEach((e, index) => {
            const brickRow = Brick.addBrickRow(this, 8, e, 85, 100 + 50*index, 10);
            this.bricks.addMultiple(brickRow);
        })

        this.bricks.children.iterate(brick => {
            brick.body.setImmovable(true);
        });

    }

    hitBrick(ball, brick) {
        brick.hit();
    }

    getMousePosition()
    {
        this.input.on('pointermove', (pointer) => {
            // Pobierz aktualną pozycję kursora
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
          
            this.ballActive();

          });
    }

    ballActive() {

        if(this.ball.active !== true)
        {
            this.ball.active = true;
            this.ball.makeActive();
        }

    }
    

}