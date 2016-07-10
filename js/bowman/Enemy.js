Enemy = function (game, index, type, name, health, strength, speed, pts) {
    var x = game.rnd.integerInRange(-100, WIDTH + 100); // random x point as starting point for the enemy 
    var y = -55;

    this.game = game;
    this.type = type;
    this.health = health;
    this.strength = strength;
    this.isAlive = true;
    this.name = name;
    this.pts = pts;

    this.enemy = enemyGroup.create(x, y, name);
    this.enemy.index = index;
    this.enemy.anchor.set(0.5, 0.5);
    this.enemy.body.velocity.y = speed * 2;
    
    this.health_bar = game.add.sprite(x, y - this.enemy.height, 'health_bar');
    this.health_bar.anchor.set(0.5, 0.5);

    var x_vel_max = Math.round(this.enemy.body.velocity.y / 2); // the enemy's x velocity is affected by its y velocity
    var x_vel_min = Math.round(this.enemy.body.velocity.y / 4);
 //this.enemy.body.velocity.x = game.rnd.integerInRange(-x_vel_min, x_vel_max);  
    if ( this.enemy.body.x < castle.body.x + (castle.width / 2) ){
        this.enemy.body.velocity.x = game.rnd.integerInRange(x_vel_min, x_vel_max); 
    }
    else if ( this.enemy.body.x > castle.body.x + (castle.width / 2) ){
        this.enemy.body.velocity.x = game.rnd.integerInRange(-x_vel_min, -x_vel_max);  
    }
    else{
        this.enemy.body.velocity.x = 0;
    }
    
    if (this.name == 'g_alpha'){ // make the 007 gohst fade in and out
        this.enemy.alpha = 0;
        this.health_bar.alpha = 0;
        game.add.tween(this.enemy).to( { alpha: 0.6 }, 1200, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.add.tween(this.health_bar).to( { alpha: 0.7 }, 1200, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }
    
    else if(this.name == 'g_normal'){
       this.enemy.body.angularVelocity = 50; 
    }
};

Enemy.prototype.damage = function(damageDone) {
    
    if (damageDone == 'noScore'){ // if the enemy is killed by attacking the castle or the level ends
        this.enemy.kill();
        this.health_bar.kill();
        this.isAlive = false;
    }
    
    else{
        this.health -= damageDone;
        this.health_bar.frame = 4 - this.health;
        
        if (this.health <= 0){ // enemy dies - squish him, throw to the ground, give points, scream
            this.enemy.scale.y = -0.6;
            this.enemy.body.velocity.y = 300;
            
            attr.gameScore += this.pts;
            scoreLabel.text = String(attr.gameScore);

            this.isAlive = false;
            this.health_bar.kill();
            
            screams[game.rnd.integerInRange(0, 3)].play();
            
            tween_score(this.pts, 'darkgreen', this.enemy);         
        };
    }
};

Enemy.prototype.update = function() {
    // make the health bar follow its owner
    this.health_bar.x = this.enemy.x;
    this.health_bar.y = this.enemy.y - this.enemy.height;
    
    // make enemy follow the castle
    /*if ( this.enemy.body.x < castle.body.x + (castle.width / 2) ){
         this.enemy.body.velocity.x = Math.abs(this.enemy.body.velocity.x);
    }
    else if ( this.enemy.body.x > castle.body.x + (castle.width / 2) ){
         this.enemy.body.velocity.x = -(Math.abs(this.enemy.body.velocity.x));
    }
    else{
        this.enemy.body.velocity.x = 0;
    }*/
};
