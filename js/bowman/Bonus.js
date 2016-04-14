Bonus = function (game, index, type, name, speed, strength, health, pts) {
    var x = game.rnd.integerInRange(35, WIDTH - 35); // random x point as starting point for the bonus 
    var y = -40;

    this.game = game;
    this.type = type;
    this.isAlive = true;
    this.strength = strength;
    this.health = health;
    this.name = name;
    this.pts = pts;

    this.bonus = bonusGroup.create(x, y, name);
    this.bonus.index = index;
    this.bonus.anchor.set(0.5, 0.5);
    this.bonus.body.velocity.y = speed;
    this.bonus.body.angularVelocity = 50; // makes the bonuses spin

    var x_vel_max = Math.round(this.bonus.body.velocity.y / 2); // the bonus's x velocity is affected by its y velocity
    var x_vel_min = Math.round(this.bonus.body.velocity.y / 4);

    if ( this.bonus.body.x < castle.body.x + (castle.width / 2) ){
        this.bonus.body.velocity.x = game.rnd.integerInRange(x_vel_min, x_vel_max); 
    }
    else if ( this.bonus.body.x > castle.body.x + (castle.width / 2) ){
        this.bonus.body.velocity.x = game.rnd.integerInRange(-x_vel_min, -x_vel_max);  
    }
    else{
        this.bonus.body.velocity.x = 0;
    }
    
    if (this.name == 'bonus_bomb'){     
         this.bonus.body.gravity.y = 60; // makes the bomb heavy
    }
    
    else if (this.name == 'bonus_clock'){
         this.bonus.body.gravity.y = 15;
    }
};

Bonus.prototype.damage = function(damageDone) {
    
    if (damageDone == 'noScore'){ // if the bonus is killed by attacking the castle or the level ends
        this.bonus.kill();
        this.isAlive = false;
    }
    
    else{
        this.health -= damageDone;
        
        if (this.health <= 0){ 
           
            if (this.name == 'bonus_clock'){
                var time_to_add = -3; // time to subtract from/add to level if player hits the clock
                time_left += time_to_add;
                timeLabel.text = format_time(time_left);

                cookooSfx.play();
                
                tween_time(time_to_add, 'darkblue', this.bonus);

                this.bonus.kill();
                this.isAlive = false;  
            }
            
            else if (this.name == 'bonus_bomb'){
                for (var i = 0; i < enemies.length; i++){ // bomb damages all enemies on screen by 1
                    if (enemies[i].isAlive){
                        enemies[i].damage(1); 
                    }
                }
                
                whistleSfx.stop();
                explodeSfx.play(); 
                
                explosion = game.add.sprite(this.bonus.body.x, this.bonus.body.y, "explosion");
                explosion.animations.add('run');
                explosion.animations.play('run', 15, false, true);
                
                this.bonus.kill();
                this.isAlive = false;  
            }
            
            else if (this.name == 'bonus_heal'){
                this.isAlive = false;
                this.bonus.scale.y = -0.6;
                this.bonus.body.velocity.y = 300;
                
                attr.gameScore += this.pts;
                if (attr.gameScore < 0) attr.gameScore = 0;
                scoreLabel.text = String(attr.gameScore);

                bonusKillSfx.play();
    
                tween_score(this.pts, 'blue', this.bonus);   
            }
        };
    }
};

Bonus.prototype.update = function() {
/*
    // uncomment to make bonus follow the castle
    
    if ( this.bonus.body.x < castle.body.x + (castle.width / 2) ){
         this.bonus.body.velocity.x = Math.abs(this.bonus.body.velocity.x);
    }
    else if ( this.bonus.body.x > castle.body.x + (castle.width / 2) ){
         this.bonus.body.velocity.x = -(Math.abs(this.bonus.body.velocity.x));
    }
    else{
        this.bonus.body.velocity.x = 0;
    }
*/
};