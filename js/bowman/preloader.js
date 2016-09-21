var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'green', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
    
        // create progress bar
        var loadingBar = this.add.sprite(this.game.world.centerX - 55,  this.game.world.centerY + 30, "loading");
        loadingBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.load.image("replay", "assets/invaders/images/replay.png");
        this.game.load.image("menu", "assets/invaders/images/menu.png");
        this.game.load.image("window", "assets/invaders/images/panel.png");
        this.game.load.image("arrow","assets/invaders/images/arrow.png");
        this.game.load.image("heart","assets/invaders/images/heart.png");
        this.game.load.image("coin","assets/invaders/images/coin.png");
        this.game.load.image("ok","assets/invaders/images/ok.png");
        
        this.game.load.image("cloud1","assets/invaders/images/cloud1.png");
        this.game.load.image("cloud2","assets/invaders/images/cloud2.png");
        
        this.game.load.image("g_normal", "assets/invaders/images/alien1.png");
        this.game.load.image("g_alpha", "assets/invaders/images/alien2.png");
        this.game.load.image("g_fast", "assets/invaders/images/alien3.png");
        this.game.load.image("g_shield", "assets/invaders/images/alien4.png");
        this.game.load.image("g_small", "assets/invaders/images/alien5.png");

        this.game.load.image("bonus_bomb", "assets/invaders/images/bonus1.png");
        this.game.load.image("bonus_clock", "assets/invaders/images/bonus2.png");
        this.game.load.image("bonus_heal", "assets/invaders/images/bonus3.png");
        this.game.load.image("medals", "assets/invaders/images/medals.png");
        
        this.game.load.spritesheet("bow", "assets/invaders/images/bow.png", 70, 90);
        this.game.load.spritesheet("health_bar", "assets/invaders/images/health_bar.png", 40, 6);
        this.game.load.spritesheet("explosion","assets/invaders/images/explosion.png", 88 ,75);
        this.game.load.spritesheet("numbers","assets/invaders/images/numbers.png", 27 ,30);
        this.game.load.spritesheet("thruster","assets/invaders/images/thruster.png", 15 ,54);

        this.game.load.spritesheet("audioBtn","assets/invaders/images/audioBtn.png", 183 ,190);
        this.game.load.spritesheet("instBtn","assets/invaders/images/instBtn.png", 183 ,190);
        this.game.load.spritesheet("playBtn","assets/invaders/images/playBtn.png", 180 ,190);
        this.game.load.spritesheet("homeBtn","assets/invaders/images/homeBtn.png", 183 ,190);
        this.game.load.spritesheet("exit_btn","assets/invaders/images/exit_btn.png", 183 ,190);

        this.game.load.audio('sfxClick1', 'assets/invaders/audio/switch1.ogg'); 
        this.game.load.audio('sfxClick2', 'assets/invaders/audio/switch2.ogg'); 
        this.game.load.audio('sfxScream1', 'assets/invaders/audio/scream1.ogg');
        this.game.load.audio('sfxScream2', 'assets/invaders/audio/scream2.ogg');
        this.game.load.audio('sfxScream3', 'assets/invaders/audio/scream3.ogg');
        this.game.load.audio('sfxScream4', 'assets/invaders/audio/scream4.ogg');
        this.game.load.audio('sfxShoot_h1', 'assets/invaders/audio/shoot_h1.ogg');
        this.game.load.audio('sfxShoot_h2', 'assets/invaders/audio/shoot_h2.ogg');
        this.game.load.audio('sfxShoot_w1', 'assets/invaders/audio/shoot_w1.ogg');
        this.game.load.audio('sfxShoot_w2', 'assets/invaders/audio/shoot_w2.ogg');

        this.game.load.audio('sfxMusic', 'assets/invaders/audio/dvorak_humoreske_7.ogg');
        this.game.load.audio('sfxHitCastle', 'assets/invaders/audio/hitCastle.ogg');
        this.game.load.audio('sfxMagic', 'assets/invaders/audio/magic.ogg');
        this.game.load.audio('sfxOhyeah', 'assets/invaders/audio/oh_yeah.ogg'); 
        this.game.load.audio('sfxbonusKill', 'assets/invaders/audio/bonusKill.ogg');
        this.game.load.audio('sfxClock', 'assets/invaders/audio/clock.ogg');
        this.game.load.audio('sfxExplode', 'assets/invaders/audio/explosion.ogg');
        this.game.load.audio('sfxWhistle', 'assets/invaders/audio/whistle.ogg');
        this.game.load.audio('sfxCookoo', 'assets/invaders/audio/cookoo.ogg');
        this.game.load.audio('sfxTriangle', 'assets/invaders/audio/triangle.ogg');
    },
    
    create: function(){
        this.game.state.start("Menu");  
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
    // console.log(progress, cacheKey, success);
};
