var gameMain = function(game){
    clickPointX = null;
    clickPointY = null;
    
    bowFrame = 0;

    ARROW_BASE_SPEED = 155; // increase for faster arrows
    ARROW_GRAVITY_Y = 770; // increase for heavier arrows

    CASTLE_MAX_HP = 300; // your castle's hit points

    enemies = [];
    bonuses = [];
    mileStones = [false, false, false, false];
};

gameMain.prototype = {
    create: function(){
        this.world.setBounds(0, 0, WIDTH, HEIGHT + 120); // extra height so arrows could fall back from the sky
        bg = this.add.tileSprite(0, 0, 706, 398, 'bg');
        bg.alpha = 0.7;
        var random = game.rnd.integerInRange(0,3);
        bg.frame = random;

        ground = this.add.sprite(0, HEIGHT - 55, null); // alien will land here
        this.physics.enable(ground, Phaser.Physics.ARCADE);
        ground.body.setSize(WIDTH, 55);
        ground.body.immovable = true;
        
        sideBounds = this.add.group(); // arrows colliding with this group will die
        sideBounds.enableBody = true;
        sideBounds.physicsBodyType = Phaser.Physics.ARCADE;
        
        sideR = sideBounds.create(WIDTH-1, -80, null);
        sideR.body.setSize(1, HEIGHT+80);
        sideR.body.immovable = true;
        
        sideL = sideBounds.create(0, -80, null);
        sideL.body.setSize(1, HEIGHT+80);
        sideL.body.immovable = true;
        
        sideU = sideBounds.create(0, -80, null);
        sideU.body.setSize(WIDTH, 1);
        sideU.body.immovable = true;
        
        castle = this.add.sprite(WIDTH/2 - 70, HEIGHT - castle.height - 20, "castle");
        this.physics.enable(castle, Phaser.Physics.ARCADE);
        castle.body.immovable = true;
        
        thrusters1 = this.add.sprite(WIDTH/2 - 65, HEIGHT - castle.height + 30, "thruster");
        thrusters2 = this.add.sprite(WIDTH/2 + 30, HEIGHT - castle.height + 30, "thruster");
        thrusters1.animations.add('run');
        thrusters1.animations.play('run', 10, true, false);
        thrusters2.animations.add('run');
        thrusters2.animations.play('run', 10, true, false);

        bow = this.add.sprite(WIDTH/2 - 10, 283, "bow");
        bow.anchor.set(0.5, 0.5);
        playRw = bow.animations.add('rw', [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12], 10, false); // animation of bow in reverse

        arrows = this.add.group();
        arrows.enableBody = true;
        arrows.physicsBodyType = Phaser.Physics.ARCADE;
        arrows.createMultiple(30, 'arrow');
        arrows.setAll('immovable', true);
        
        enemyGroup = this.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        bonusGroup = this.add.group();
        bonusGroup.enableBody = true;
        bonusGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        clouds = this.add.group();
        clouds.enableBody = true;
        clouds.physicsBodyType = Phaser.Physics.ARCADE;

        createClouds();

        castle_hp = CASTLE_MAX_HP;
        attr.currentLevel = 1;
        attr.gameScore = 0;
        
        scoreLabel = this.add.text(46, 17, String(attr.gameScore), {
            font: '16px ' + font, fill: 'darkgreen', fontWeight: 'normal', align: 'center'
        });
        coin = this.add.image(18, 20, 'coin');
        
        var score_best = localStorage.getItem("invaders-bestScore");
        if (score_best == null || score_best == 'null' || score_best == undefined || score_best == 'undefined') score_best = "0";
            
        bestLabel = this.add.text(617, 370, score_best, {
            font: '10px ' + font, fill: 'darkred', fontWeight: 'normal', align: 'center'
        });
        var medal = this.game.add.image(605, 370, 'medals');
        medal.scale.set(0.4, 0.4);
        
        var cloudImg = this.add.image(643, 7, 'cloud2');
        cloudImg.scale.set(0.62,0.85);
        cloudImg.alpha = 0.5;
        lvl_number = this.add.sprite(680, 35, 'numbers');
        lvl_number.frame = (attr.currentLevel - 1);
        lvl_number.anchor.set(1, 0.5);

        castleLabel = this.add.text(55, HEIGHT - 70, CASTLE_MAX_HP, {
            font: '17px ' + font, fill: 'purple', fontWeight: 'normal', align: 'center'
        });
        var heartImg = this.add.image(20, HEIGHT - 65, 'heart');

        timeLabel = this.add.text(55, HEIGHT - 38, format_time(get_time_left()), {
            font: '18px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'center'
        });
        var watch = this.add.image(15, HEIGHT - 38, 'bonus_clock');
        watch.scale.set(0.7,0.7);

        exit_btn = this.add.button(670, 365, 'exit_btn');       
        exit_btn.inputEnabled = true;
        exit_btn.input.useHandCursor = true;
        exit_btn.scale.set(0.15, 0.15);
        exit_btn.alpha = 0.7;
        
        exit_btn.events.onInputOver.add(function(){ 
            exit_btn.frame = 1;
        }, this);
        
        exit_btn.events.onInputOut.add(function(){ 
            exit_btn.frame = 0;
        }, this);
        
        exit_btn.events.onInputDown.add(function(){ 
            end_game('lost'); 
        }, this);
        
        modal = new gameModal(game);

        timer_add_enemy();
        timer_end_level();

        try{
            Cocoon.Ad.AdMob.configure({
                android: { 
                      interstitial:"ca-app-pub-9795366520625065/6274475030"
                }
            });
            
            interstitial = Cocoon.Ad.AdMob.createInterstitial();
            interstitial.load();

        } catch(e){}
        
        screams = [ // scream sounds
            game.add.audio('sfxScream1'), game.add.audio('sfxScream2'),
            game.add.audio('sfxScream3'), game.add.audio('sfxScream4')
        ];
        
        hitSfx = game.add.audio('sfxHitCastle');
        healSfx = game.add.audio('sfxMagic');
        levelSfx = game.add.audio('sfxOhyeah', 0.4, false);
        explodeSfx = game.add.audio('sfxExplode', 0.8, false);
        cookooSfx = game.add.audio('sfxCookoo');
        bonusKillSfx = game.add.audio('sfxbonusKill', 0.5, false);
        
        whistleSfx = game.add.audio('sfxWhistle');
        clockSfx = game.add.audio('sfxClock', 0.8, false);
        triangleSfx = game.add.audio('sfxTriangle', 0.7, false);

        music = game.add.audio('sfxMusic', 0.2, true);
        music.play(); 
        
        button = false;
    },
    
    update: function(){   
        bow_and_arrow_updates();
     
        bg.tilePosition.y += 3;
        
        // collisions 
        game.physics.arcade.collide(ground, arrows, arrow_outOfBounds, null, this); // arrow hits ground
        game.physics.arcade.collide(sideBounds, arrows, arrow_outOfBounds, null, this); // arrow hits side bounds
        game.physics.arcade.collide(clouds, arrows, arrow_hit_cloud, null, this); // arrow hits cloud
        
        for (var i = 0; i < enemies.length; i++){
            if (enemies[i].isAlive){
                enemies[i].update();
              //  game.physics.arcade.collide(ground, enemies[i].enemy, null, null, this); // enemy hits ground
                game.physics.arcade.overlap(arrows, enemies[i].enemy, arrow_hit_enemy, null, this); // arrow hits enemy
                game.physics.arcade.collide(castle, enemies[i].enemy, enemy_hit_castle, null, this); // enemy hits castle
            }
        }
        
        for (var i = 0; i < bonuses.length; i++){
            if (bonuses[i].isAlive){
                bonuses[i].update();
                game.physics.arcade.overlap(arrows, bonuses[i].bonus, arrow_hit_bonus, null, this); // arrow hits bonus
                game.physics.arcade.collide(castle, bonuses[i].bonus, bonus_hit_castle, null, this); // bonus hits castle
                game.physics.arcade.collide(ground, bonuses[i].bonus, bonus_outOfBounds, null, this); // bonus hits ground
            }
        }
        
        if (attr.gameScore > 1000 && !mileStones[0]){
            mile_stone(1);  
        }
        
        else if (attr.gameScore > 2500 && !mileStones[1]){
            mile_stone(2);
        }
        
        else if (attr.gameScore > 5000 && !mileStones[2]){
            mile_stone(3);
        }
        
        else if (attr.gameScore > 10000 && !mileStones[3]){
            mile_stone(4);
        }
    },  
};

function bow_and_arrow_updates(){
   if(game.input.activePointer.isDown && button == false){

        if (clickPointY == null && clickPointX == null){ // get initial x and y points on mouse click
            clickPointY = game.input.activePointer.y;
            clickPointX = game.input.activePointer.x;
        } 

        else{ // get the angle and strech of the bow on mouse drag
            
            var angle = Math.atan2(clickPointY - game.input.y, clickPointX - game.input.x) * (180 / Math.PI); // get the angle of bow and arrow

            if( (angle < -45 && angle > -135) || (angle < 135 && angle > 45) ){ // strech bow up or down
                bowFrame = Math.abs( Math.round( (clickPointY - game.input.y) / 17));
            }
            else{ // strech bow left or right
                bowFrame = Math.abs( Math.round( (clickPointX - game.input.x) / 30));  
            }
            
            if (bowFrame > 11) bowFrame = 11;
            else if (bowFrame < 1) bowFrame = 1;
            
            bow.frame = bowFrame;
            bow.angle = angle;
            
        }
    }
    
    else if (game.input.activePointer.isUp && bowFrame > 0){ // release arrow on mouse leave   
        bowFrame = 0;
        clickPointY = null;
        clickPointX = null;
        
        try{
            arrow = arrows.getFirstExists(false); // get our arrow, place it on the bow with the right angle, apply gravity, shoot it!
            
            var factorX = 0;
            var factorY = 0;
            var angle = bow.angle;


            if (angle >= -180 && angle <= -145){
                factorX = -15;
                factorY = 20;
            }
            else if (angle >= -145 && angle <= -120){
                factorX = -5;
                factorY = 30;
            }
            else if (angle >= -120 && angle <= -70){
                factorX = -20;
                factorY = 0;
            }
            else if (angle >= -15 && angle <= 20){
                factorX = 0;
                factorY = 20;
            }
            else if (angle >= 160 && angle <= 180){
                factorX = 0;
                factorY = 25;
            }

            arrow.reset(this.game.world.centerX + 20 + factorX, 260 + factorY);
            
            arrow.angle = bow.angle;
            arrow.body.gravity.y = ARROW_GRAVITY_Y;
    
            game.physics.arcade.velocityFromRotation(
                bow.rotation,
                ARROW_BASE_SPEED * bow.frame,
                arrow.body.velocity
            );
            
            arrow.body.angularVelocity = Math.atan2(arrow.body.velocity.x, arrow.body.velocity.y) * (180 / Math.PI) / 1.5; // makes the arrow change its angle while flying, for realism sake
        }
        catch(e){ // in case you somehow run out of arrows the game won't crash, but skip one arrow and reload them
            arrows.forEach(function(a) {
                a.kill();
            }, this);
        }
        
        try{ shots[ Math.floor( bow.frame / 3) ].play(); } // play shooting sound influenced by speed of the shot
        catch(e){}; 

        bow.animations.play('rw', 250, false, false); // reset bow      
    }  
}

function arrow_hit_cloud(_cloud){
    var random = game.rnd.integerInRange(0,3);
    var noCloud;
    if (random == 1){
        noCloud = game.add.tween(_cloud).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
        noCloud.onComplete.add(function(){
            _cloud.kill();
        }, this);
    }
}

function arrow_hit_bonus(_bonus, _arrow){
    _arrow.kill();
    bonuses[_bonus.index].damage(1);
}

function bonus_hit_castle(_castle, _bonus){

    for(var e in attr.bonusAttr){
        var color;
        
        if (_bonus.key === 'bonus_heal'){
            healSfx.play();
            color = 'darkgreen';
        }
        
        else if (_bonus.key === 'bonus_bomb'){
            explosion = this.add.sprite(_bonus.body.x, _bonus.body.y, "explosion");
            explosion.animations.add('run');
            explosion.animations.play('run', 15, false, true);
            
            game.camera.y = 0; // shake the camera
            game.add.tween(game.camera).to({ y: +9 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 6, true).start();
            
            whistleSfx.stop();
            explodeSfx.play(); 
            
            color = 'darkred';
        }
        
        else if (_bonus.key === 'bonus_clock'){
            
            var time_to_add = 6; // the time to add if a clock hits you
            time_left += ( time_to_add / get_object_length(attr.bonusAttr) ); // will add *3 seconds because of the loop, so we divide it
            timeLabel.text = format_time(time_left); 
            
            cookooSfx.play(); 
            
            tween_time(time_to_add, 'darkblue', _bonus);   
        }

        if (_bonus.key === attr.bonusAttr[String(e)].name){ // when a bonus hit castle
            
            bonuses[_bonus.index].damage('noScore'); // kill bonus
            
            update_castle( attr.bonusAttr[String(e)].strength, color); // and affect castle's hp
        } 
    }      
}

function arrow_hit_enemy(_enemy, _arrow){
    var arrowVel = _arrow.body.velocity.y;
    
    var random = game.rnd.integerInRange(0, Math.ceil(Math.abs(arrowVel) + (attr.currentLevel * 20)));

    if (random < 1350){
        _arrow.kill();
    }
    else{ 
        superText = game.add.text(_arrow.body.x, _arrow.body.y, 'CrazzzyShot!', { 
            font: '13px ' + font, fill: 'purple', fontWeight: 'normal', align: 'center'
        });
        superText.anchor.set(0.5, 0.5);
        superText.angle = -135;

        game.add.tween(superText).from( { y: _arrow.body.y + 150 }, 2000, Phaser.Easing.Linear.In, true);
        game.add.tween(superText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(superText).to( { angle: 0 }, 1000, Phaser.Easing.Linear.None, true);
        
        enemies[_enemy.index].damage(2);
    }

    enemies[_enemy.index].damage(1); // each hit takes 1 damage from the alien
}

function enemy_hit_castle(_castle, _enemy){  
   
    for(var e in attr.enemyAttr){
        if (_enemy.key === attr.enemyAttr[String(e)].name){

            enemies[_enemy.index].damage('noScore'); // kill enemy without scoring the player

            update_castle( get_enemy_strength(e) ,'red');

            game.camera.y = 0; // shake the camera a little bit
            game.add.tween(game.camera).to({ y: +5 }, 35, Phaser.Easing.Sinusoidal.InOut, false, 0, 3, true).start();
            hitSfx.play(); 
        }
    }   
}

function arrow_outOfBounds(_bounds, _arrow){
    _arrow.kill();
}

function bonus_outOfBounds(_bounds, _bonus){
    _bonus.kill();
    
    try{ whistleSfx.fadeOut(2000); } catch(e){}
}

function timer_end_level(){
    // count the time to next level

    level_timer = game.time.events.loop(Phaser.Timer.SECOND, function(){
        if (time_left >= 1){   
            time_left--;
            timeLabel.text = format_time(time_left);
            
            if (time_left < 6){
                timeLabel.fill = 'pink';
            }
        }

        else if (time_left <= 0){
            if (attr.currentLevel < 8){ // if there are more levels, show the end level screen
                level_end_modal(attr.currentLevel); 

                levelSfx.play();
                
                attr.currentLevel++;
                time_left = get_time_left();

                timeLabel.text = format_time(time_left);
                timeLabel.fill = 'darkblue';
                
            }
            else{
                end_game('won');
            }
        }
    }, this);
}

function timer_add_enemy(){
    // create a new enemy every 'minInterval' to 'maxInterval' ms
    var time_to_next_enemy = game.rnd.integerInRange(
        get_current_level_name().minInterval, 
        get_current_level_name().maxInterval
    );

    enemy_timer = game.time.events.add(time_to_next_enemy, function(){
        create_new_enemy(get_current_level_name().strongEnemyChance); 
    }, this, []);
}

function create_new_enemy(strongChance){

    // create random enemies, the higher the level ('strongChance') - the tougher the enemies
    var random_n = Math.round( game.rnd.integerInRange(1, strongChance) ); // random number between 1 and 'strongChance'

    enemy_n = Math.ceil( random_n / 25 ); // our random number divided in 25 is our enemy number
    
    var n_enemy_types = get_object_length(attr.enemyAttr);
    if (enemy_n > n_enemy_types) enemy_n = n_enemy_types;  

    var enemy_type = attr.enemyAttr["enemy" + enemy_n];
    
    // create a new enemy
    enemies.push(new Enemy(
        game, 
        enemies.length,
        "enemy" + enemy_type,
        enemy_type.name, 
        enemy_type.health,
        enemy_type.strength,
        enemy_type.speed,
        enemy_type.points
    ));
    
    var BONUS_CHANCE = 4; // increase value to reduce bonus chance
    var random_bonus = Math.round( game.rnd.integerInRange(1, BONUS_CHANCE) ); 
    if (random_bonus == 1) create_bonus(); // every time we create an enemy there's a 1/BONUS_CHANCE we'll create a bonus
    
    timer_add_enemy();     
}

function create_bonus(){
    
    var n_bonus_types =  get_object_length(attr.bonusAttr);
    var random_n = Math.round( game.rnd.integerInRange(1, n_bonus_types) ); // choose random bonus to create
    var bonus_type = attr.bonusAttr["bonus" + random_n];
    
    if (random_n == 1) {
        whistleSfx.volume = 1;
        whistleSfx.play();
    }
    else if (random_n == 2) clockSfx.play();
    else if (random_n == 3) triangleSfx.play();

    // create a new bonus
    bonuses.push(new Bonus(
        game, 
        bonuses.length,
        "bonus" + bonus_type,
        bonus_type.name, 
        bonus_type.speed,
        bonus_type.strength,
        bonus_type.health,
        bonus_type.points
    )); 
}

function update_castle(hp, color){
    castle_hp -= hp; // get the strength of the hitting object and subtract it from castle hp
    
    var frame =  Math.round (( CASTLE_MAX_HP / castle_hp ) / 3); // change the castle's frame based on its hp
    if (frame > 2) frame = 2;
    castle.frame = frame;

    if (castle_hp <= 0){ // end the game, kill castle and remaining enemies
        castle_hp = 0;
        
        kill_everyone();
        end_game('lost'); 
    }
    
    castleLabel.text = castle_hp;
    
    hpLostText = game.add.text(castle.body.x + (castle.width/2) - 15, HEIGHT - 210, -hp, { 
         font: '22px ' + font, fill: color, fontWeight: 'normal', align: 'center'
    });
    var heartImg = game.add.image(hpLostText.x - 25, hpLostText.y + 5, 'heart');
    
    game.add.tween(hpLostText).from( { y: HEIGHT - 100 }, 300, Phaser.Easing.Linear.In, true);
    game.add.tween(hpLostText).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
    
    game.add.tween(heartImg).from( { y: HEIGHT - 100 }, 300, Phaser.Easing.Linear.In, true);
    game.add.tween(heartImg).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
}

function level_end_modal(level) {
    music.stop();
    
    game.time.events.pause(level_timer);
    game.time.events.pause(enemy_timer);
    
    for (var i = 0; i < enemies.length; i++){
        enemies[i].damage('noScore');
    }
    
    for (var i = 0; i < bonuses.length; i++){
        bonuses[i].damage('noScore');
    }
    
    button = true;
    
    try{
        interstitial.show();
    } catch(e){}

    modal.createModal({
        type:"nextLevel",
        includeBackground: true,
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
                content: "Great job!\n Get ready for\n level " + (level+1) + "!",
                fontFamily: font,
                fontSize: 38,
                color: "0xFEFF49",
                offsetY: -50,
                stroke: "0x000000",
                strokeThickness: 5
            },
            {
                type: "image",
                content: "ok",
                offsetY: 85,
                contentScale: 0.35,
                callback: function () {
                    next_level();
                }
            },
        ]
   });
   modal.showModal("nextLevel");  
   
   okImg = modal.getModalItem('nextLevel',3); 
   okImg.input.useHandCursor = true;
   
   for (n=0; n<4; n++){
       game.add.tween(modal.getModalItem('nextLevel',n)).from( { y: - 800 }, 500, Phaser.Easing.Linear.In, true);
   }
}

function mile_stone(stone) {
    mileStones[(stone-1)] = true;

    music.stop();
    
    game.time.events.pause(level_timer);
    game.time.events.pause(enemy_timer);

    button = true; 
    
    modal.createModal({
        type:"mileStone",
        includeBackground: true,
        modalCloseOnInput: false,
        itemsArr: [
            {
                type: "image",
                content: "window",
                offsetY: 0,
                offsetX: 0,
                contentScale: 1.15
            },
            {
                type: "text",
                content: "Milestone score! \n Choose a bonus:",
                fontFamily: font,
                fontSize: 26,
                color: "0xFEDF22",
                offsetY: -100,
                stroke: "0x000000",
                strokeThickness: 5
            },
            {
                type: "image",
                content: "bonus_heal",
                offsetX: -140,
                offsetY: 30,
                contentScale: 1,
                callback: function () {
                    clicks[1].play();
                    music.play(); 
                    
                    modal.hideModal('mileStone');
                    
                    game.time.events.resume(level_timer);
                    game.time.events.resume(enemy_timer); 
                    
                    button = false;   
                    
                    castle_hp += (25 * stone);
                    castleLabel.text = castle_hp;
                }
            },
            {
                type: "image",
                content: "bonus_clock",
                offsetX: -50,
                offsetY: 30,
                contentScale: 1,
                callback: function () {
                    clicks[1].play();
                    music.play(); 
                    
                    modal.hideModal('mileStone');
                    
                    game.time.events.resume(level_timer);
                    game.time.events.resume(enemy_timer); 
                    
                    button = false;   
                    
                    time_left -= (6 * stone);
                }
            },
            {
                type: "image",
                content: "bonus_bomb",
                offsetX: 50,
                offsetY: 30,
                contentScale: 1,
                callback: function () {
                    clicks[1].play();
                    music.play(); 
                    
                    modal.hideModal('mileStone');
                    
                    game.time.events.resume(level_timer);
                    game.time.events.resume(enemy_timer); 
                    
                    button = false; 
                    
                   for (var i = 0; i < enemies.length; i++){ // bomb damages all enemies on screen by 1
                       if (enemies[i].isAlive){
                           enemies[i].damage((1 * stone)); 
                       }
                   }  
                }
            },
            {
                type: "image",
                content: "arrow",
                offsetX: 140,
                offsetY: 30,
                contentScale: 1,
                callback: function () {
                    clicks[1].play();
                    music.play(); 
                    
                    modal.hideModal('mileStone');
                    
                    game.time.events.resume(level_timer);
                    game.time.events.resume(enemy_timer); 
                    
                    button = false;   
                    ARROW_BASE_SPEED += (12 * stone);
                }
            },
        ]
   });
   modal.showModal("mileStone");  
   
   img1 = modal.getModalItem('mileStone',4); 
   img1.input.useHandCursor = true;
   
   img2 = modal.getModalItem('mileStone',3); 
   img2.input.useHandCursor = true;
   
   img3 = modal.getModalItem('mileStone',5); 
   img3.input.useHandCursor = true;
   
   img4 = modal.getModalItem('mileStone',6); 
   img4.input.useHandCursor = true;
   
  for (n=0; n<7; n++){
       game.add.tween(modal.getModalItem('mileStone',n)).from( { y: - 800 }, 200, Phaser.Easing.Linear.In, true);
   }   
}

function next_level(){
    clicks[1].play();
    music.play(); 

    modal.hideModal('nextLevel');
    
    lvl_number.frame = (attr.currentLevel - 1);
    
    game.time.events.resume(level_timer);
    game.time.events.resume(enemy_timer); 
    
    button = false;   
}

function end_game(reason){
    game.state.start('Game_over', false, false, reason, attr.gameScore, save_score());
}

function save_score(){ // get your score and save it to webstorge 
     if (attr.gameScore > attr.bestScore || attr.bestScore == 'null' || attr.bestScore == null){
        localStorage.setItem("invaders-bestScore", attr.gameScore);  // if it's the best score ever
        return true;
     }

     else{ 
         return false; 
     }    
}

function kill_everyone(){

    for (var i = 0; i < enemies.length; i++){
        enemies[i].damage('noScore');
    }
    
    for (var i = 0; i < bonuses.length; i++){
        bonuses[i].damage('noScore');
    }
}

function get_enemy_strength(e){
    
    strength = attr.enemyAttr[String(e)].strength;
    
    return strength;
}

function get_time_left(){
    
    time_left = get_current_level_name().time;
    
    return time_left;
}

function get_current_level_name(){
   
    level_name = attr.levelAttr["level" + String(attr.currentLevel)];
    
    return level_name;
}

function get_object_length(obj){
    var count = 0;
    var i;
    
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
}

function format_time(sec){
    var sec_num = parseInt(sec, 10);
    
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time  = minutes+':'+seconds;
    
    return time;
}

function tween_score(score, color, object){
    pointsText = game.add.text(object.body.x, HEIGHT - 180, score, { 
         font: '22px ' + font, fill: color, fontWeight: 'normal', align: 'center'
    });
    
    coin = game.add.image(pointsText.x - 25, pointsText.y, 'coin');

    game.add.tween(pointsText).from( { y: HEIGHT + 100 }, 2200, Phaser.Easing.Linear.In, true);
    game.add.tween(pointsText).to( { alpha: 0 }, 3350, Phaser.Easing.Linear.None, true);
    
    game.add.tween(coin).from( { y: HEIGHT + 100 }, 2200, Phaser.Easing.Linear.In, true);
    game.add.tween(coin).to( { alpha: 0 }, 2900, Phaser.Easing.Linear.None, true);    
}

function tween_time(time, color, object){
    timeText = game.add.text(object.body.x, 0, time, { 
         font: '18px ' + font, fill: color, fontWeight: 'normal', align: 'center'
    });
    
    clock = game.add.image(timeText.x, timeText.y, 'bonus_clock');
    clock.scale.set(0.7, 0.7);
    
    game.add.tween(timeText).from( { y: object.body.y }, 2000, Phaser.Easing.Linear.In, true);
    game.add.tween(timeText).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); 
    
    game.add.tween(clock).from( { y: object.body.y }, 2000, Phaser.Easing.Linear.In, true);
    game.add.tween(clock).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);    
}

function createClouds(){
    var cloud_to_create = game.rnd.integerInRange(1, 2);
    var time_to_next = game.rnd.integerInRange(7000, 14000);
    var start_y = game.rnd.integerInRange(10, 150);
    var velocity_x = game.rnd.integerInRange(-75, 75);
    var velocity_y = game.rnd.integerInRange(5, 25);
    var cloud_alpha = game.rnd.integerInRange(3, 7);
    var scalingX = game.rnd.integerInRange(65, 95);
    var scalingY = game.rnd.integerInRange(65, 95);
   
    if (velocity_x < 0) start_x = 850;
    else{ start_x = -100; }
    
    cloud = clouds.create(start_x ,start_y, 'cloud'+cloud_to_create);
    cloud.body.velocity.x = velocity_x;
    cloud.body.velocity.y = velocity_y;
    cloud.alpha = '0.' + cloud_alpha;
    cloud.scale.set(scalingX / 100, scalingY / 100);
    cloud.body.immovable = true;
    
    if (cloud.body.x < -200 || cloud.body.x > 950) cloud.kill();

    cloud_timer = game.time.events.add(time_to_next, function(){
        createClouds(); 
    }, this, []);
}