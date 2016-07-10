attr = {
    currentLevel: 1,
    gameScore: 0,
    bestScore: localStorage.getItem("invaders-bestScore"),
    
    levelAttr: {
        "level1":{
            name: "Level: 1",
            time: "30",
            strongEnemyChance: 15,
            minInterval: 1100/2,
            maxInterval: 3200/2
        },
        "level2":{
            name: "Level: 2",
            time: "45",
            strongEnemyChance: 35,
            minInterval: 900/2,
            maxInterval: 3200/2
        },
        "level3":{
            name: "Level: 3",
            time: "55",
            strongEnemyChance: 55,
            minInterval: 800/2,
            maxInterval: 3350/2
        },
        "level4":{
            name: "Level: 4",
            time: "70",
            strongEnemyChance: 65,
            minInterval: 700/2,
            maxInterval: 3300/2
        },
        "level5":{
            name: "Level: 5",
            time: "85",
            strongEnemyChance: 95,
            minInterval: 550/2,
            maxInterval: 3050/2
        },
        "level6":{
            name: "Level: 6",
            time: "110",
            strongEnemyChance: 125,
            minInterval: 425/2,
            maxInterval: 2680/2
        },
        "level7":{
            name: "Level: 7",
            time: "160",
            strongEnemyChance: 150,
            minInterval: 340/2,
            maxInterval: 2000/2
        },
        "level8":{
            name: "Level: 8",
            time: "125",
            strongEnemyChance: 180,
            minInterval: 290/2,
            maxInterval: 1700/2
        },
    },
    
    enemyAttr:{
        "enemy1":{ // enemy that fades in and out
            name: 'g_alpha',
            health: 1,
            strength: 20,
            speed: 40,
            points: 25,
        },
        "enemy2":{ // enemy that rotates
            name: 'g_normal',
            health: 1,
            strength: 25,
            speed: 50,
            points: 30,
        },
        "enemy3":{ // fast enemy
            name: 'g_fast',
            health: 2,
            strength: 40,
            speed: 125,
            points: 50,
        },
        "enemy4":{ // enemy that requires more shots to kill
            name: 'g_shield',
            health: 4,
            strength: 60,
            speed: 25,
            points: 70,
        },
        "enemy5":{ // small enemy
            name: 'g_small',
            health: 2,
            strength: 30,
            speed: 85,
            points: 50,
        },
    },

    bonusAttr:{
        "bonus1":{ // hurts castle/enemies
            name: 'bonus_bomb',
            speed: 70,
            health: 1,
            strength: 100,
            points: 0
        },
         "bonus2":{ // adds/subtracts time 
            name: 'bonus_clock',
            speed: 60,
            health: 1,
            strength: 0,
            points: 0
        },
        "bonus3":{ // heals damage
            name: 'bonus_heal',
            speed: 40,
            health: 1,
            strength: -20,
            points: -40
        },

    }
};