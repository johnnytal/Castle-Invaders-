//document.addEventListener("deviceready", start, false);
window.onload = start;

function start(){
    WIDTH = 706; 
    HEIGHT = 398;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Menu", menu);
    game.state.add("Game", gameMain);
    game.state.add("Instructions", inst);
    game.state.add("Game_over", game_over);
    
    game.state.start("Boot");  
};

var boot = function(game){};
  
boot.prototype = {
    preload: function(){
          this.game.load.audio('sfxMenu', 'assets/invaders/audio/Reggae_ident.ogg'); 
          this.game.load.image("loading", "assets/invaders/images/loading.png");
        
          this.game.load.spritesheet("bg","assets/invaders/images/bg.jpg", 720 ,398);
          this.game.load.spritesheet("castle", "assets/invaders/images/tower.png", 140, 87);
    },
    create: function(){
        game.stage.backgroundColor = '#B9CEC5';
        font = 'Seymour One';
        //var interstitial;
        
        menuSfx = game.add.audio('sfxMenu');
        menuSfx.play();

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
        this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
        
        this.scale.pageAlignHorizontally = true;
        this.scale.forceOrientation(false, true);
        
        this.scale.setScreenSize(true);

        game.state.start('Preloader');
    }
};