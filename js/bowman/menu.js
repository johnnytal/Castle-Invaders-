var menu = function(game){};

menu.prototype = {
    create: function(){
        button = false;
        
        game.add.image(0, 0, 'bg');
        castle = this.add.image(WIDTH/2 - 70, 280, "castle");
        
        cloud1 = this.add.image(WIDTH/2 - 256, 172, "cloud2");
        cloud1.alpha = 0;
        game.add.tween(cloud1).to( { alpha: 0.5 }, 2000, Phaser.Easing.Linear.None, true);

        clouds = this.add.group();
        clouds.enableBody = true;
        clouds.physicsBodyType = Phaser.Physics.ARCADE;
        clouds.alpha = 0.6;
        
        createClouds();
        
        bow = this.add.sprite(WIDTH/2 - 10, 290, "bow");
        bow.anchor.set(0.5, 0.5);
        playRw = bow.animations.add('rw', [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12], 10, false); // animation of bow in reverse

        arrows = this.add.group();
        arrows.enableBody = true;
        arrows.physicsBodyType = Phaser.Physics.ARCADE;
        arrows.createMultiple(20, 'arrow');
        arrows.setAll('checkWorldBounds', true);
        arrows.setAll('outOfBoundsKill', true); 
        
        arrow = this.add.image(WIDTH/2 - 15, 32, "arrow");
        arrow.scale.set(6.7, 1.4);
        arrow.aplha = 0.8;
        game.add.tween(arrow).from( { x: -2000 }, 2000, Phaser.Easing.Cubic.In, true);
        
        nameLabel = this.game.add.text(15, 15, 'C  A  S  T  L  E      I  N  V  A  D  E  R  S !', {
            font: '31px ' + font, fill: 'pink', fontWeight: 'bold', align: 'center'
        });
        nameLabel.alpha = 0;
        nameLabel.setShadow(3, 3, 'rgba(0, 105, 0 ,0.4)', 5);
        game.add.tween(nameLabel).to( { alpha: 1 }, 2850, Phaser.Easing.Linear.None, true);
   
        headerLabel = this.game.add.text(60, 140, 'R E A D Y', {
            font: '22px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
        });
        game.add.tween(headerLabel).from( { x: -300 }, 1000, Phaser.Easing.Linear.Out, true);
        
        headerLabel2 = this.game.add.text(93, 190, 'A I M', {
            font: '23px ' + font, fill: 'yellow', fontWeight: 'normal', align: 'center'
        });
        game.add.tween(headerLabel2).from( { x: -400 }, 3000, Phaser.Easing.Bounce.Out, true);
       
        headerLabel3 = this.game.add.text(120, 240, 'S H O O T !', {
            font: '25px ' + font, fill: 'blue', fontWeight: 'bold', align: 'center'
        });
        game.add.tween(headerLabel3).from( { x: -2000 }, 2000, Phaser.Easing.Cubic.In, true);

        howToText = this.game.add.text(345, 125, 
            "- Swipe  back  to  gain  momentum -\n - Swipe  sideways  to  aim -\n - Release  to  shoot ! -", {
            font: '14px ' + font, fill: 'brown', fontWeight: 'bold', align: 'center'
        });
        howToText.alpha = 0;
        game.add.tween(howToText).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        
        clicks = [ game.add.audio('sfxClick1'), game.add.audio('sfxClick2') ]; // click sounds
        
        shots = [ // shot sounds
            game.add.audio('sfxShoot_w1'), game.add.audio('sfxShoot_w2'),
            game.add.audio('sfxShoot_h1'), game.add.audio('sfxShoot_h2'),
        ]; 

        start_btn = this.add.sprite(this.game.world.centerX - 130, 110, 'playBtn');
        start_btn.inputEnabled = true;
        start_btn.input.useHandCursor = true;
        start_btn.scale.set(0.47, 0.47);
        
        start_btn.events.onInputOver.add(function(){ 
            button = true;
            start_btn.frame = 1;
        }, this);
        
        start_btn.events.onInputOut.add(function(){ 
            button = false; 
            start_btn.frame = 0;
        }, this);
        
        start_btn.events.onInputDown.add(function(){ 
            this.game.state.start("Game"); 
        }, this);
        
        inst_btn = this.add.sprite(650, 270, 'instBtn');
        inst_btn.inputEnabled = true;
        inst_btn.input.useHandCursor = true;
        inst_btn.scale.set(0.25, 0.25);
        
        inst_btn.events.onInputOver.add(function(){ 
            button = true;
            inst_btn.frame = 1;
        }, this);
        
        inst_btn.events.onInputOut.add(function(){ 
            button = false; 
            inst_btn.frame = 0;
        }, this);
        
        inst_btn.events.onInputDown.add(function(){ 
            this.game.state.start("Instructions"); 
        }, this);

        audio_btn = this.add.sprite(650, 330, 'audioBtn');
        audio_btn.inputEnabled = true;
        audio_btn.input.useHandCursor = true;
        audio_btn.scale.set(0.25, 0.25);
        
        audio_btn.events.onInputOver.add(function(){ 
            button = true;
        }, this);
        
        audio_btn.events.onInputOut.add(function(){ 
            button = false; 
        }, this);
        
        audio_btn.events.onInputDown.add(function(){ 
            if (!game.sound.mute){
                game.sound.mute = true;
                audio_btn.frame = 1;
            }
            else{
                game.sound.mute = false;
                audio_btn.frame = 0;    
            }
        }, this);
    },
    
    update: function(){ // the menu is also kind of a practice mode where the player can get a feel on the bow
        bow_and_arrow_updates();
    },
    
    startGame: function() {
        game.state.start('Game');
        clicks[0].play();
    },
    
    startInfo: function() {
        game.state.start('Instructions');
        clicks[0].play();
    }, 
};