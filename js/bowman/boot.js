window.onload = function(){
    font = 'Seymour One';

    WIDTH = 706; HEIGHT = 398; // 16:9 ratio
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;
    
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "");    
      
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
          this.game.load.audio('sfxMenu', 'assets/audio/Reggae_ident.mp3'); 
          
          this.game.load.image("loading", "assets/images/loading.png");
          this.game.load.image("bg", "assets/images/bg.jpg");
          
          this.game.load.spritesheet("castle", "assets/images/tower.png", 140, 87);
    },
    create: function(){
        game.stage.backgroundColor = '#B9CEC5';
        
        menuSfx = game.add.audio('sfxMenu');
        menuSfx.play();
 
        if (this.game.device.desktop){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            var factor = 1.12; // that's what i found to be the nicest size on a desktop, but you can play with it
            
            this.scale.maxWidth = w / factor; 
            this.scale.maxHeight = h / factor; 
            
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.setScreenSize(true);
        } 
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = w;
            this.scale.maxHeight = h;
            
            this.scale.pageAlignHorizontally = true;
            this.scale.forceOrientation(false, true);

            this.scale.onOrientationChange.add(onOrientationChange, this);
            
            this.scale.setScreenSize(true);
        }

        game.state.start('Preloader');
    
    }
};

function onOrientationChange(){
    
}
