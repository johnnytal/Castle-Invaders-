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

        this.game.load.image("replay", "assets/images/replay.png");
        this.game.load.image("menu", "assets/images/menu.png");
        this.game.load.image("window", "assets/images/panel.png");
        this.game.load.image("arrow","assets/images/arrow.png");
        this.game.load.image("heart","assets/images/heart.png");
        this.game.load.image("coin","assets/images/coin.png");
        this.game.load.image("ok","assets/images/ok.png");
        
        this.game.load.image("cloud1","assets/images/cloud1.png");
        this.game.load.image("cloud2","assets/images/cloud2.png");
        
        this.game.load.image("g_normal", "assets/images/alien1.png");
        this.game.load.image("g_alpha", "assets/images/alien2.png");
        this.game.load.image("g_fast", "assets/images/alien3.png");
        this.game.load.image("g_shield", "assets/images/alien4.png");
        this.game.load.image("g_small", "assets/images/alien5.png");

        this.game.load.image("bonus_bomb", "assets/images/bonus1.png");
        this.game.load.image("bonus_clock", "assets/images/bonus2.png");
        this.game.load.image("bonus_heal", "assets/images/bonus3.png");
        this.game.load.image("medals", "assets/images/medals.png");
        
        this.game.load.spritesheet("bow", "assets/images/bow.png", 70, 90);
        this.game.load.spritesheet("health_bar", "assets/images/health_bar.png", 40, 6);
        this.game.load.spritesheet("explosion","assets/images/explosion.png", 88 ,75);
        this.game.load.spritesheet("numbers","assets/images/numbers.png", 28 ,30);
        
        this.game.load.spritesheet("audioBtn","assets/images/audioBtn.png", 183 ,190);
        this.game.load.spritesheet("instBtn","assets/images/instBtn.png", 183 ,190);
        this.game.load.spritesheet("playBtn","assets/images/playBtn.png", 180 ,190);
        this.game.load.spritesheet("homeBtn","assets/images/homeBtn.png", 183 ,190);
        this.game.load.spritesheet("exit_btn","assets/images/exit_btn.png", 183 ,190);

        this.game.load.audio('sfxClick1', 'assets/audio/switch1.mp3'); 
        this.game.load.audio('sfxClick2', 'assets/audio/switch2.mp3'); 
        this.game.load.audio('sfxScream1', 'assets/audio/scream1.mp3');
        this.game.load.audio('sfxScream2', 'assets/audio/scream2.mp3');
        this.game.load.audio('sfxScream3', 'assets/audio/scream3.mp3');
        this.game.load.audio('sfxScream4', 'assets/audio/scream4.mp3');
        this.game.load.audio('sfxShoot_h1', 'assets/audio/shoot_h1.mp3');
        this.game.load.audio('sfxShoot_h2', 'assets/audio/shoot_h2.mp3');
        this.game.load.audio('sfxShoot_w1', 'assets/audio/shoot_w1.mp3');
        this.game.load.audio('sfxShoot_w2', 'assets/audio/shoot_w2.mp3');

        this.game.load.audio('sfxMusic', 'assets/audio/dvorak_humoreske_7.mp3');
        this.game.load.audio('sfxHitCastle', 'assets/audio/hitCastle.mp3');
        this.game.load.audio('sfxMagic', 'assets/audio/magic.mp3');
        this.game.load.audio('sfxOhyeah', 'assets/audio/oh_yeah.mp3'); 
        this.game.load.audio('sfxbonusKill', 'assets/audio/bonusKill.mp3');
        this.game.load.audio('sfxClock', 'assets/audio/clock.mp3');
        this.game.load.audio('sfxExplode', 'assets/audio/explosion.mp3');
        this.game.load.audio('sfxWhistle', 'assets/audio/whistle.mp3');
        this.game.load.audio('sfxCookoo', 'assets/audio/cookoo.mp3');
        this.game.load.audio('sfxTriangle', 'assets/audio/triangle.mp3');
    },
    
    create: function(){
        this.game.state.start("Menu");  
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
    // console.log(progress, cacheKey, success);
};
