var inst = function(game){};

inst.prototype = {
    create: function(){
        this.add.image(0, 0, 'bg');
        
        this.add.image(50, 20, 'g_normal');
        this.add.image(50, 85, 'g_alpha');
        this.add.image(50, 150, 'g_fast');
        this.add.image(50, 215, 'g_shield');
        this.add.image(55, 280, 'g_small');
        
        this.add.image(350, 30, 'bonus_bomb');
        this.add.image(350, 130, 'bonus_clock');
        this.add.image(350, 235, 'bonus_heal');

        this.game.add.text(100, 20, "Blue alien - your usual everyday alien \n - 1 shot to kill   * 25 pts *", {
            font: '14px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(100, 85, "007 alien - fades in and out \n - 1 shot to kill   * 30 pts *", {
            font: '14px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(100, 150, "Comando alien - extra fast \n - 2 shots to kill   * 50 pts *", {
            font: '14px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(100, 215, "Brick alien - slow but very strong \n - 4 shots to kill   * 70 pts *", {
            font: '14px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(100, 280, "Baby alien - small and slippery \n - 2 shots to kill   * 50 pts *", {
            font: '14px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        
        this.game.add.text(400, 30, "Bomb - Hit it to damage all enemies on screen, \n does great damage if it hits your castle.", {
            font: '15px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(400, 130, "Clock - Hit it to subtract time to next level, \n let it hit you to add time.", {
            font: '15px ' + font, fill: 'brown', fontWeight: 'normal', align: 'left'
        });
        this.game.add.text(400, 235, "Smiley - adds HP when it hits your castle, \n if you hit it you lose 40 pts.", {
            font: '15px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'left'
        });

        home_btn = this.add.button(this.game.world.centerX - 60, 300, 'button', this.startMenu, this, 'home','home_hover','home_click');
        home_btn.input.useHandCursor = true;
        home_btn.scale.set(0.4, 0.4);
    },
    
    startMenu: function () {
        game.state.start('Menu');
        clicks[1].play();
    }
};