var inst = function(game){};

inst.prototype = {
    create: function(){
        this.add.image(0, 0, 'bg');
        
        this.add.image(18, 20, 'g_normal');
        this.add.image(25, 85, 'g_alpha');
        this.add.image(25, 150, 'g_fast');
        this.add.image(25, 215, 'g_shield');
        this.add.image(30, 280, 'g_small');
        
        this.add.image(320, 30, 'bonus_bomb');
        this.add.image(330, 130, 'bonus_clock');
        this.add.image(330, 235, 'bonus_heal');

        this.game.add.text(85, 20, "Circly - rotates \n 1 shot to kill   * 25 pts *", {
            font: '11px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(85, 85, "007 - fades in and out \n 1 shot to kill   * 30 pts *", {
            font: '11px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(85, 150, "Comando - extra fast \n 2 shots to kill   * 50 pts *", {
            font: '11px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(85, 215, "Jelly - slow but very strong \n 4 shots to kill   * 70 pts *", {
            font: '11px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(85, 280, "Baby - small and slippery \n 2 shots to kill   * 50 pts *", {
            font: '11px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        
        this.game.add.text(375, 45, "Bomb - Damages all enemies on screen", {
            font: '11px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(375, 145, "Clock - Subtract time to next level", {
            font: '11px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(375, 250, "Flower - Adds HP when it hits your castle", {
            font: '11px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });

        home_btn = this.add.button(this.game.world.centerX - 60, 325, 'homeBtn');
        home_btn.inputEnabled = true;
        home_btn.input.useHandCursor = true;
        home_btn.scale.set(0.3, 0.3);
        
        home_btn.events.onInputOver.add(function(){ 
            home_btn.frame = 1;
        }, this);
        
        home_btn.events.onInputOut.add(function(){ 
            home_btn.frame = 0;
        }, this);
        
        home_btn.events.onInputDown.add(function(){ 
            this.game.state.start("Menu"); 
        }, this);
    },
    
    startMenu: function () {
        game.state.start('Menu');
        clicks[1].play();
    }
};