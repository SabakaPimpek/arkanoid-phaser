import Phaser from 'phaser';

import Ball from '../prefabs/ball';
import Paddle from '../prefabs/paddle';
import Brick from '../prefabs/brick';
import Text from '../ui/text';
import PowerUp from '../prefabs/powerup';

import level1JSON from '../levels/level1.json';
import brickImg from '../images/brick.png';

export default class Play extends Phaser.Scene {
    
    constructor (game)
    {
        super('Play');
        this.game = game;
    }

    init()
    {
        this.gamePoints = 0;
        this.gameLifes = {
            current: 2,
            max: 5,
            removeLife: function() {
                this.current--;
                if(this.current < 0) this.scene.restart();
            },
            addLife: function() {
                this.current;
                if(!(this.current >= this.max)) this.current++;
            }
        };
        this.screenText = {
           
        }
        this.arr_hearts;
        this.powerUps = this.physics.add.group();
    }
    
    preload ()
    {
        this.load.image('brick', brickImg);
        this.load.tilemapTiledJSON('level1', level1JSON);
    }
    
    create()
    {

        this.cameras.main.setBackgroundColor(0x6495ED);
        this.paddle = new Paddle(this, this.game.CONFIG.width/2, 770, 'paddle');
        this.ball = new Ball(this, this.paddle.x, this.paddle.y-this.paddle.height/2 - 8, 'ball');
    
        this.getMousePosition();

        this.createBricks();

        this.createUI();
        this.updateUI();

        this.physics.add.collider(this.ball, this.paddle, this.calculateBallAngle);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick.bind(this));
        this.physics.add.overlap(this.paddle, this.powerUps, this.collectPowerUp, null, this)

    }
    
    update()
    {
        this.paddle.updatePosition();
        this.ball.updateStatic();
        this.ball.checkBottomBound();
    }

    createBricks()
    {
        this.bricks = this.physics.add.group();

        const map = this.make.tilemap({ key: 'level1' });
        const tileset = map.addTilesetImage('brick', 'brick')

        let layer = map.createLayer('Level', tileset, 50, 100);

        const matchingTiles = map.filterTiles(tile => tile.index === 1);

        const gos = matchingTiles.map(tile => {
            const block = new Brick(this, tile.pixelX + 50 , tile.pixelY + 100, 'brick');
            return block;
        });

        
        // const gos = map.createFromTiles(1, -1, { key: 'brick' })
        // .map(go => {    
        //     const block = new Brick(this, go.x, go.y + 400, 'brick');
        //     block.setTint(0x000000)
        //     return block;
        // })

        layer.destroy();
    
        this.bricks.addMultiple(gos);

        this.bricks.children.iterate(brick => {
                brick.body.setImmovable(true);
        });
        


        // this.bricks.children.iterate(brick => {
        //     brick.destroy();
        // });


        // const map = this.make.tilemap({ key: 'level1' })
        // const tileset = map.addTilesetImage('block', 'block')

        // const layer = new Phaser.Tilemaps.StaticTilemapLayer(this, map, 10, tileset, 0, 100)



        // const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffc0cb];

        // colors.forEach((e, index) => {
        //     const brickRow = Brick.addBrickRow(this, 8, e, 85, 150 + 50*index, 10);
        //     this.bricks.addMultiple(brickRow);
        // })

        // this.bricks.children.iterate(brick => {
        //     brick.body.setImmovable(true);
        // });

    }

    hitBrick(ball, brick) {
        brick.hit();
        this.generatePowerUp(brick);
    }

    collectPowerUp(paddle, powerUp) {
        powerUp.destroy();
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
            this.ball.setActive(true);
        }

    }

    calculateBallAngle(ball, paddle) //This function is called when ball hits paddle
    {

        
        if(paddle.body.touching.up === true) 
        {

                // Obliczenie pozycji względem paletki (-1 do 1)
        const relativePosition = (ball.x - paddle.x) / (paddle.width / 2);

        // Prędkość odbicia piłki w osi X w zależności od pozycji względem paletki
        let bounceVelocityX = ball.maxSpeed * relativePosition;

        if(bounceVelocityX > ball.maxSpeed/2) bounceVelocityX = ball.maxSpeed/2;
        else if(bounceVelocityX < -ball.maxSpeed/2) bounceVelocityX = -(ball.maxSpeed/2)

        // Ustawienie prędkości odbicia piłki
        ball.setVelocityX(bounceVelocityX);
        ball.setVelocityY(-300);
        }

        else {
            ball.setImmovable(true);
        }
        
    }

    generatePowerUp(brick)
    {
        const random = Math.random();

        if(random >= 0.75)
        {
            console.log("jest!")

            const power = Math.floor(Math.random() * (7- 0 + 1)) + 0;
            
            const obj = new PowerUp(this, brick.x, brick.y, 'powerUp', power);

            this.powerUps.add(obj);
        }

        this.powerUps.children.iterate(e => {
            e.body.setImmovable(true);
            e.body.setVelocityY(200);
        });
    }

    createUI()
    {
        this.screenText.points = new Text(
            this,
            0,
            0,
            'Punkty: 0',
            '',
            0
            );

             
        this.arr_hearts = [];
        const spacing = 10;
        let objWidth = this.paddle.width;

        for(let i = 0; i < this.gameLifes.max; i++)
        {
            const lifeIMG = this.add.image(spacing + ((objWidth + spacing) * i), this.game.CONFIG.height - spacing, 'paddle');
            objWidth = lifeIMG.width*0.2;

            lifeIMG.setScale(0.2, 0.4);
            lifeIMG.setOrigin(0, 1);
            this.arr_hearts.push(lifeIMG);
        }
    }
    
    
    updateUI()
    {    
        this.screenText.points.setText("Punkty: " + this.gamePoints);
        
        this.arr_hearts.forEach((e, index) => {
            if(index < this.gameLifes.current)
            {
                e.setVisible(true);
            }
            else
            {
                e.setVisible(false);
            }
        })
    }
}