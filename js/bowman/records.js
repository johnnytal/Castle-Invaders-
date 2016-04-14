var records = function(game){};

records.prototype = {
    create: function(){
        this.add.image(0, 0, 'bg');
        
        bestScoreLabel = this.game.add.text(this.game.world.centerX - 90, 50, "Your best scores: ", {
            font: '23px ' + font, fill: 'blue', fontWeight: 'normal', align: 'center'
        });

        for (x = 0; x < 3 ; x++){
            var score = attr.bestScores[x];
            if (score == null || score == 'null') score = "N/A";
            
            this.game.add.text(this.game.world.centerX - 40, 100 + x*50, (x+1) + ". - " + score, {
                font: '21px ' + font, fill: 'red', fontWeight: 'normal', align: 'center'
            });
            
            medal = this.game.add.image(this.game.world.centerX - 75, 100 + x*50, 'medals');
            medal.frame = x;
        }       

        home_btn = this.add.button(this.game.world.centerX - 60, 300, 'button', this.startMenu, this, 'home','home_hover','home_click');
        home_btn.input.useHandCursor = true;
        home_btn.scale.set(0.4, 0.4);
    },
    
    startMenu: function () {
        game.state.start('Menu');
        clicks[1].play();
    }
};