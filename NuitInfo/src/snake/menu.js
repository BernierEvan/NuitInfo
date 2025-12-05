
var Menu = {

    preload : function() {
        // No images needed, we'll create pixel art style graphics
        // Initialize difficulty to normal if not set
        if(!difficulty) {
            difficulty = 'normal';
        }
    },
        
    create: function () {
        
        // Post-apocalyptic dark background
        game.stage.backgroundColor = '#000000ff';
        
        // Create rusty cracked grid background
        var bgGraphics = game.add.graphics(0, 0);
        bgGraphics.lineStyle(1, 0x000000, 0.4);
        for(var x = 0; x <= 600; x += 10) {
            bgGraphics.moveTo(x, 0);
            bgGraphics.lineTo(x, 450);
        }
        for(var y = 0; y <= 450; y += 10) {
            bgGraphics.moveTo(0, y);
            bgGraphics.lineTo(600, y);
        }
        
        // Add rust spots
        for(var i = 0; i < 30; i++) {
            var rx = Math.random() * 600;
            var ry = Math.random() * 450;
            var rustSpot = game.add.graphics(rx, ry);
            rustSpot.beginFill(0Xffffff, Math.random() * 0.2);
            rustSpot.drawCircle(0, 0, Math.random() * 20 + 10);
            rustSpot.endFill();
        }
        
        // Create rusty metal border
        var border = game.add.graphics(0, 0);
        border.lineStyle(6, 0xFFFFFF, 1);
        border.drawRect(30, 30, 540, 390);
        
        // Draw pixel art title "SNAKE"
        this.drawPixelSnakeTitle(100, 60);
        
        
        // Draw apple icon
        this.drawPixelApple(350, 200);
        
        // Difficulty selection
        game.add.text(300, 250, "SELECT DIFFICULTY", { 
            font: "bold 16px 'Courier New', monospace", 
            fill: "#00cccc", 
            align: "center"
        }).anchor.setTo(0.5);
        
        // Create difficulty buttons (post-apocalyptic colors)
        this.createDifficultyButton(80, 280, "EASY", 'easy', 0x000000);
        this.createDifficultyButton(190, 280, "NORMAL", 'normal', 0x000000);
        this.createDifficultyButton(310, 280, "HARD", 'hard', 0x000000);
        this.createDifficultyButton(420, 280, "EXTREME", 'extreme', 0x000000);
        
        // Instructions in pixel style
        game.add.text(300, 330, "USE ARROW KEYS TO CONTROL", { 
            font: "bold 14px 'Courier New', monospace", 
            fill: "#00cccc", 
            align: "center"
        }).anchor.setTo(0.5);
        
        // Create post-apocalyptic rusty START button
        var buttonBg = game.add.graphics(200, 360);
        buttonBg.beginFill(0x000000, 1);
        buttonBg.drawRect(0, 0, 200, 50);
        buttonBg.endFill();
        buttonBg.lineStyle(4, 0x00cccc, 1);
        buttonBg.drawRect(0, 0, 200, 50);
        buttonBg.inputEnabled = true;
        buttonBg.events.onInputDown.add(this.startGame, this);
        
        // Make button interactive with hover effect
        buttonBg.events.onInputOver.add(function() {
            buttonBg.clear();
            buttonBg.beginFill(0x000000, 0.9);
            buttonBg.drawRect(0, 0, 200, 50);
            buttonBg.endFill();
            buttonBg.lineStyle(4, 0xffffff, 1);
            buttonBg.drawRect(0, 0, 200, 50);
        }, this);
        
        buttonBg.events.onInputOut.add(function() {
            buttonBg.clear();
            buttonBg.beginFill(0x000000, 1);
            buttonBg.drawRect(0, 0, 200, 50);
            buttonBg.endFill();
            buttonBg.lineStyle(4, 0x00cccc, 1);
            buttonBg.drawRect(0, 0, 200, 50);
        }, this);
        
        var startText = game.add.text(300, 385, "START", { 
            font: "bold 24px 'Courier New', monospace", 
            fill: "#00cccc", 
            align: "center"
        });
        startText.anchor.setTo(0.5);
        
        // Add blinking "Press to Start" text
        var blinkText = game.add.text(300, 350, "CLICK START TO PLAY", {
            font: "bold 12px 'Courier New', monospace",
            fill: "#00cccc", 
            align: "center"
        });
        blinkText.anchor.setTo(0.5);
        
        // Make text blink
        game.time.events.loop(500, function() {
            blinkText.visible = !blinkText.visible;
        }, this);
        
    },
    
    drawPixelSnakeTitle: function(x, y) {
        // Draw "SNAKE" in large pixel art style
        var pixelSize = 8;
        var letters = {
            'S': [
                [0,1,1,1,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,1],
                [0,0,0,0,1],
                [1,1,1,1,0]
            ],
            'N': [
                [1,0,0,0,1],
                [1,1,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'A': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'K': [
                [1,0,0,0,1],
                [1,0,0,1,0],
                [1,0,1,0,0],
                [1,1,0,0,0],
                [1,0,1,0,0],
                [1,0,0,1,0],
                [1,0,0,0,1]
            ],
            'E': [
                [1,1,1,1,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,1]
            ]
        };
        
        var word = "SNAKE";
        var currentX = x;
        var spacing = 10;
        
        for(var i = 0; i < word.length; i++) {
            var letter = letters[word[i]];
            for(var row = 0; row < letter.length; row++) {
                for(var col = 0; col < letter[row].length; col++) {
                    if(letter[row][col] === 1) {
                        var pixel = game.add.graphics(currentX + col * pixelSize, y + row * pixelSize);
                        // Rusty metal color with variation
                        var Rustcolor = 0x00cccc;
                        pixel.beginFill(Rustcolor);
                        pixel.drawRect(0, 0, pixelSize, pixelSize);
                        pixel.endFill();
                        // Add dark outline for depth
                        pixel.lineStyle(1, 0x000000, 0.8);
                        pixel.drawRect(0, 0, pixelSize, pixelSize);
                    }
                }
            }
            currentX += (letter[0].length * pixelSize) + spacing;
        }
    },
    
    drawPixelApple: function(x, y) {
        var pixelSize = 10;
        var apple = [
            [0,0,1,0,0],
            [0,1,0,1,0],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [0,1,1,1,0]
        ];
        
        for(var row = 0; row < apple.length; row++) {
            for(var col = 0; col < apple[row].length; col++) {
                if(apple[row][col] === 1) {
                    var pixel = game.add.graphics(x + col * pixelSize, y + row * pixelSize);
                    if(row === 0 || (row === 1 && col === 1)) 
                    {
                        pixel.beginFill(0x62ECA3); // Green stem
                    } 
                    else 
                    {
                        pixel.beginFill(0xff0000); // Red apple
                    }
                    pixel.drawRect(100, 0, pixelSize, pixelSize);
                    pixel.endFill();
                }
            }
        }
    },
    
    createDifficultyButton: function(x, y, label, difficultyLevel, color) {
        var width = 100;
        var height = 35;
        var isSelected = (difficulty === difficultyLevel);
        
        // Create button background
        var btn = game.add.graphics(x, y);
        if(isSelected) {
            btn.beginFill(color, 1);
            btn.drawRect(0, 0, width, height);
            btn.endFill();
            btn.lineStyle(3, 0x00cccc, 1);
        } else {
            btn.beginFill(color, 0.3);
            btn.drawRect(0, 0, width, height);
            btn.endFill();
            btn.lineStyle(2, color, 1);
        }
        btn.drawRect(0, 0, width, height);
        btn.inputEnabled = true;
        
        // Add label
        var btnText = game.add.text(x + width/2, y + height/2, label, { 
            font: "bold " + (label.length > 6 ? "10" : "12") + "px 'Courier New', monospace", 
            fill: isSelected ? "#fff" : "#fff", 
            align: "center"
        });
        btnText.anchor.setTo(0.5);
        
        // Click handler
        btn.events.onInputDown.add(function() {
            difficulty = difficultyLevel;
            // Refresh the menu to update button states
            this.state.start('Menu');
        }, this);
        
        // Hover effect
        btn.events.onInputOver.add(function() {
            btn.clear();
            btn.beginFill(color, 0.8);
            btn.drawRect(0, 0, width, height);
            btn.endFill();
            btn.lineStyle(3, 0xffffff, 1);
            btn.drawRect(0, 0, width, height);
        }, this);
        
        btn.events.onInputOut.add(function() {
            btn.clear();
            if(difficulty === difficultyLevel) {
                btn.beginFill(color, 1);
                btn.drawRect(0, 0, width, height);
                btn.endFill();
                btn.lineStyle(3, 0xffffff, 1);
            } else {
                btn.beginFill(color, 0.3);
                btn.drawRect(0, 0, width, height);
                btn.endFill();
                btn.lineStyle(2, color, 1);
            }
            btn.drawRect(0, 0, width, height);
        }, this);
    },
        
    startGame: function () {
        
        // Change the state to the actual game.
        this.state.start('Game');
        
    }
        
};
