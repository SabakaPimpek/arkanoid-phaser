import Text from '../ui/text';
import ballImg from '../images/ball.png'
import paddleImg from '../images/paddle.png'
import powerUpImg from '../images/powerups.png'

export default class Preload extends Phaser.Scene {
    
    constructor (game)
    {
        super('Preload');
        this.game = game;
    }
    
    preload ()
    {

        // Background
        this.bg = this.add.graphics({ x: 0, y: 0});
        this.bg.fillStyle('0xF4CCA1', 1);
        this.bg.fillRect(0, 0, this.game.CONFIG.width, this.game.CONFIG.height);

        this.createLoadingBar()
        
        // this.load.setPath('assets/images');

        this.load.image('ball', ballImg, {
            frameWidth: 20,
            frameHeight: 20,
        })

        this.load.image('paddle', paddleImg, {
            frameWidth: 150,
            frameHeight: 50,
        })

        this.load.spritesheet('powerUp', powerUpImg, {
            frameWidth: 20,
            frameHeight: 11,
            spacing: 1
        })
       
    }

    create ()
    {
        // Create sprite animations
        // this.createAllAnims();

        //Go to menu
        this.time.addEvent({
            delay: 1000,
            callback: () => {this.scene.start('Menu', this.game); },
            callbackScope: this
        })
    }

    createLoadingBar()
    {

        // Title
        this.title = new Text(
            this,
            this.game.CONFIG.centerX,
            75,
            'Loading Game',
            'preload',
            0.5
        );

        // Progress text
        this.txt_progress = new Text(
            this,
            this.game.CONFIG.centerX,
            this.game.CONFIG.centerY -5,
            'Loading...',
            'preload',
            {x: 0.5, y: 1}            
        );

        // Progress bar
        // ...

            let x = 10;
            let y = this.game.CONFIG.centerY + 5;
            let w = this.game.CONFIG.width - 2*x;
            let h = 18;

            this.progress = this.add.graphics({ x: x, y: y})
            this.border = this.add.graphics({ x: x, y: y})
        // Progress callback
        this.load.on('progress', this.onProgress, this)
    }
    
    onProgress (val)
    {
        // Width of progress bar
        // ...

        let w = this.game.CONFIG.width - 2*this.progress.x;
        let h = 36;

        this.progress.clear();
        this.progress.fillStyle('0xFFFFFF', 1);
        this.progress.fillRect(0, 0, w * val, h);

        this.border.clear();
        this.border.lineStyle(4, '0x4D6592', 1);
        this.border.strokeRect(0, 0, w*val, h)

        // Percentage in progress text
        let perc = Math.round(val * 100) + '%';;
        this.txt_progress.setText(perc);

    }

    createAllAnims()
    {
        // Hero walking

        this.anims.create({
            key:  'character-walk-down',
            frames: this.anims.generateFrameNames('character', { frames: [0, 1, 0, 2]}),
            repeat: -1,
            frameRate: 4
        });
        
        this.anims.create({
            key:  'character-walk-left',
            frames: this.anims.generateFrameNames('character', { frames: [6, 7, 6, 8]}),
            repeat: -1,
            frameRate: 4
        });

        this.anims.create({
            key:  'character-walk-right',
            frames: this.anims.generateFrameNames('character', { frames: [9, 10, 9, 11]}),
            repeat: -1,
            frameRate: 4
        });


        // Green slime walking

        this.anims.create({
            key:  'slimeGreen-walk',
            frames: this.anims.generateFrameNames('character', { frames: [0, 1, 0, 2]}),
            repeat: -1,
            frameRate: 12
        });

        // Red slime walking

        this.anims.create({
            key:  'slimeRed-walk',
            frames: this.anims.generateFrameNames('character', { frames: [0, 1, 0, 2]}),
            repeat: -1,
            frameRate: 12
        });
    }
}``