var game_over = function(game){};

game_over.prototype = {
    create: function(){
        music.stop();
        kill_everyone();
    },
    
    init: function(reason, score, best){
        var message = '';
        var best_message = '';
     
        if (best) best_message = '\nNew Hi Score!';
        
        if (reason == 'lost') message = 'Game Over!\n Your score: ' + score + best_message;  
    
        else{ message = 'YOU WIN!\n Your score: ' + score + best_message; } 
              
        modal.createModal({
            type:"game_over",
            includeBackground: false,
            modalCloseOnInput: false,
            itemsArr: [
             {
                type: "image",
                content: "window",
                offsetY: 0,
                offsetX: 0,
                contentScale: 1.3
            },
            {
                type: "text",
                content: message,
                fontFamily: font,
                fontSize: 32,
                color: "0xFEFF49",
                offsetY: -70,
                stroke: "0x000000",
                strokeThickness: 5
            },
            {
                type: "image",
                content: "replay",
                offsetY: 70,
                offsetX: 50,
                contentScale: 0.4,
                callback: function () { // start a new game
                    clicks[1].play();
                    game.state.start('Game');
                }
            },
            {
                type: "image",
                content: "menu",
                offsetY: 70,
                offsetX: -50,
                contentScale: 0.4,
                callback: function () { // return to main menu
                    clicks[0].play();
                    game.state.start('Menu');
                }
            }
        ]
    });   
        
        modal.showModal("game_over");
        
        homeImg = modal.getModalItem('game_over',2);
        replayImg = modal.getModalItem('game_over',3);
        
        homeImg.input.useHandCursor = true;
        replayImg.input.useHandCursor = true;
        
        for (n=0; n<4; n++){
            game.add.tween(modal.getModalItem('game_over',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
        } 
    }
};
