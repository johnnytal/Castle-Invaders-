var menu = function(game){};

menu.prototype = {
    create: function(){
        button = false;
        
        game.add.image(0, 0, 'bg');
        castle = this.add.image(WIDTH/2 - 60, 265, "castle");
        
        cloud1 = this.add.image(WIDTH/2 - 278, 177, "cloud2");
        cloud1.alpha = 0;
        game.add.tween(cloud1).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

        clouds = this.add.group();
        clouds.enableBody = true;
        clouds.physicsBodyType = Phaser.Physics.ARCADE;
        clouds.alpha = 0.6;
        
        createClouds();
        
        bow = this.add.sprite(WIDTH/2, 260, "bow");
        bow.anchor.set(0.5, 0.5);
        playRw = bow.animations.add('rw', [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12], 10, false); // animation of bow in reverse

        arrows = this.add.group();
        arrows.enableBody = true;
        arrows.physicsBodyType = Phaser.Physics.ARCADE;
        arrows.createMultiple(20, 'arrow');
        arrows.setAll('checkWorldBounds', true);
        arrows.setAll('outOfBoundsKill', true); 
        
        arrow = this.add.image(WIDTH/2 - 65, 32, "arrow");
        arrow.scale.set(6.7, 1.4);
        arrow.aplha = 0.8;
        game.add.tween(arrow).from( { x: -2000 }, 2000, Phaser.Easing.Cubic.In, true);
        
        nameLabel = this.game.add.text(25, 15, 'C  A  S  T  L  E      I  N  V  A  D  E  R  S !', {
            font: '42px ' + font, fill: 'purple', fontWeight: 'bold', align: 'center'
        });
        nameLabel.alpha = 0;
        game.add.tween(nameLabel).to( { alpha: 1 }, 2850, Phaser.Easing.Linear.None, true);
   
        headerLabel = this.game.add.text(60, 140, 'R E A D Y', {
            font: '22px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
        });
        game.add.tween(headerLabel).from( { x: -300 }, 1000, Phaser.Easing.Linear.Out, true);
        
        headerLabel2 = this.game.add.text(90, 190, 'A I M', {
            font: '25px ' + font, fill: 'green', fontWeight: 'normal', align: 'center'
        });
        game.add.tween(headerLabel2).from( { x: -400 }, 3000, Phaser.Easing.Bounce.Out, true);
       
        headerLabel3 = this.game.add.text(120, 240, 'S H O O T !', {
            font: '25px ' + font, fill: 'blue', fontWeight: 'bold', align: 'center'
        });
        game.add.tween(headerLabel3).from( { x: -2000 }, 2000, Phaser.Easing.Cubic.In, true);

        howToText = this.game.add.text(465, 85, 
            "H o w  t o  s h o o t ?\n 1. click anywhere in the game window. \n 2. move pointer back to gain strength.\n 3. move pointer sideways to aim. \n 4. release to shoot !", {
            font: '14px ' + font, fill: 'brown', fontWeight: 'normal', align: 'center'
        });
        howToText.alpha = 0;
        game.add.tween(howToText).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        
        creditText = this.game.add.text(570, 340, 
            "A game by Johnny Tal \n w w w . j o h n n y t a l . c o m", {
            font: '10px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'center'
        });
        
        clicks = [ game.add.audio('sfxClick1'), game.add.audio('sfxClick2') ]; // click sounds
        
        shots = [ // shot sounds
            game.add.audio('sfxShoot_w1'), game.add.audio('sfxShoot_w2'),
            game.add.audio('sfxShoot_h1'), game.add.audio('sfxShoot_h2'),
        ]; 

        start_btn = this.add.button(this.game.world.centerX - 130, 110, 'button', this.startGame, this, 'play','play_hover','play_click');
        start_btn.input.useHandCursor = true;
        start_btn.scale.set(0.42, 0.42);
        
        inst_btn = this.add.button(520, 240, 'button', this.startInfo, this, 'inst','inst_hover','inst_click');
        inst_btn.input.useHandCursor = true;
        inst_btn.scale.set(0.3, 0.3);

        record_btn = this.add.button(585, 240, 'button', this.startRecord, this, 'record','record_hover','record_click');
        record_btn.input.useHandCursor = true;
        record_btn.scale.set(0.3, 0.3);

        audio_btn = this.add.button(660, 15, 'button', this.toggleSound, this, 'audio_on','audio_on','audio_on');
        audio_btn.input.useHandCursor = true;
        audio_btn.scale.set(0.2, 0.2);
        if (game.sound.mute) audio_btn.frame = 10;
        
        no_shots_on_buttons();
    },
    
    update: function(){ // the menu is also kind of a practice mode where the player can get a feel on the bow
        bow_and_arrow_updates();
    },
    
    startGame: function() {
        game.state.start('Game');
        clicks[0].play();
    },

    toggleSound: function() {
        if (game.sound.mute == false){
            audio_btn = this.add.button(660, 15, 'button', this.toggleSound, this, 'audio_off','audio_off','audio_off');
            game.sound.mute = true;
        }
        else{
            audio_btn = this.add.button(660, 15, 'button', this.toggleSound, this, 'audio_on','audio_on','audio_on');
            game.sound.mute = false;
            clicks[0].play();
        }
         
        audio_btn.scale.set(0.2, 0.2);
        audio_btn.input.useHandCursor = true;
        no_shots_on_buttons();
    },
    
    startInfo: function() {
        game.state.start('Instructions');
        clicks[0].play();
    }, 
    
    startRecord: function() {
        game.state.start('Records');
        clicks[0].play();
    }, 
};

function no_shots_on_buttons(){
    buttons = [audio_btn, record_btn, inst_btn, start_btn];
   
    for (n = 0; n < buttons.length; n++){
        buttons[n].onInputOver.add(function(){ button = true; }, this);
        buttons[n].onInputOut.add(function(){ button = false; }, this);
    }
}
