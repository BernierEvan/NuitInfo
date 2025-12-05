var Game_Over = {

            preload : function() {
                // No images needed, we'll create pixel art style graphics
            },
        
            create : function() {
        
                // Post-apocalyptic dark background
                game.stage.backgroundColor = '#000000ff';
                
                // Create rusty border
                var border = game.add.graphics(0, 0);
                border.lineStyle(4, 0xffffff, 1);
                border.drawRect(20, 20, 560, 410);
                
                // Create rusty grid pattern background
                var bgGraphics = game.add.graphics(0, 0);
                bgGraphics.lineStyle(1, 0x3d2817, 0.3);
                for(var x = 0; x <= 600; x += 20) {
                    bgGraphics.moveTo(x, 0);
                    bgGraphics.lineTo(x, 450);
                }
                for(var y = 0; y <= 450; y += 20) {
                    bgGraphics.moveTo(0, y);
                    bgGraphics.lineTo(600, y);
                }
                
                // Add rust spots
                for(var i = 0; i < 20; i++) {
                    var rx = Math.random() * 600;
                    var ry = Math.random() * 450;
                    var rustSpot = game.add.graphics(rx, ry);
                    rustSpot.beginFill(0x4a2511, Math.random() * 0.2);
                    rustSpot.drawCircle(0, 0, Math.random() * 15 + 5);
                    rustSpot.endFill();
                }
                
                // Draw pixel art "GAME OVER" text
                this.drawPixelText("GAME OVER", 150, 80, 0xff0000, 4);
                
                // Draw skull icon in pixel art style
                this.drawPixelSkull(250, 150);
                
                // Add score information with pixel font style
                game.add.text(300, 260, "LAST SCORE", { 
                    font: "bold 20px 'Courier New', monospace", 
                    fill: "#00cccc", 
                    align: "center"
                }).anchor.setTo(0.5);
                
                game.add.text(300, 295, score.toString(), { 
                    font: "bold 32px 'Courier New', monospace", 
                    fill: "#00cccc", 
                    align: "center"
                }).anchor.setTo(0.5);
                
                // Add difficulty information
                game.add.text(300, 330, "DIFFICULTY: " + (difficulty || 'NORMAL').toUpperCase(), { 
                    font: "bold 16px 'Courier New', monospace", 
                    fill: this.getDifficultyColor(difficulty), 
                    align: "center"
                }).anchor.setTo(0.5);
                
                // Create rusty metal style button
                var buttonBg = game.add.graphics(200, 370);
                buttonBg.beginFill(0x000000, 1);
                buttonBg.drawRect(0, 0, 200, 50);
                buttonBg.endFill();
                buttonBg.lineStyle(3, 0xffffff, 1);
                buttonBg.drawRect(0, 0, 200, 50);
                buttonBg.inputEnabled = true;
                buttonBg.events.onInputDown.add(this.startGame, this);
                
                // Make button interactive with hover effect
                buttonBg.events.onInputOver.add(function() {
                    buttonBg.clear();
                    buttonBg.beginFill(0x000000, 0.9);
                    buttonBg.drawRect(0, 0, 200, 50);
                    buttonBg.endFill();
                    buttonBg.lineStyle(3, 0xffffff, 1);
                    buttonBg.drawRect(0, 0, 200, 50);
                }, this);
                
                buttonBg.events.onInputOut.add(function() {
                    buttonBg.clear();
                    buttonBg.beginFill(0x000000, 1);
                    buttonBg.drawRect(0, 0, 200, 50);
                    buttonBg.endFill();
                    buttonBg.lineStyle(3, 0x00cccc, 1);
                    buttonBg.drawRect(0, 0, 200, 50);
                }, this);
                
                game.add.text(300, 395, "RETRY", { 
                    font: "bold 24px 'Courier New', monospace", 
                    fill: "#00cccc", 
                    align: "center"
                }).anchor.setTo(0.5);
        
            },
            
            getDifficultyColor: function(diff) {
                if(diff === 'easy') return '#00ff00';
                if(diff === 'hard') return '#ff9900';
                if(diff === 'extreme') return '#ff0000';
                return '#ffff00';
            },
            
            drawPixelText: function(text, x, y, color, scale) {
                // Simple pixel art text using rectangles
                var letterWidth = 5 * scale;
                var letterHeight = 7 * scale;
                var spacing = 2 * scale;
                
                var currentX = x;
                
                for(var i = 0; i < text.length; i++) {
                    if(text[i] === ' ') {
                        currentX += letterWidth + spacing;
                        continue;
                    }
                    
                    var graphics = game.add.graphics(currentX, y);
                    graphics.beginFill(color);
                    
                    // Simple block letters
                    graphics.drawRect(20, 0, letterWidth, letterHeight);
                    graphics.endFill();
                    
                    currentX += letterWidth + spacing;
                }
            },
            
            drawPixelSkull: function(x, y) {
                var pixelSize = 8;
                var skull = [
                    [0,1,1,1,1,1,1,0],
                    [1,1,1,1,1,1,1,1],
                    [1,0,0,1,1,0,0,1],
                    [1,0,0,1,1,0,0,1],
                    [1,1,1,1,1,1,1,1],
                    [1,1,0,1,1,0,1,1],
                    [1,1,1,0,0,1,1,1],
                    [0,1,0,0,0,0,1,0]
                ];
                
                for(var row = 0; row < skull.length; row++) {
                    for(var col = 0; col < skull[row].length; col++) {
                        if(skull[row][col] === 1) {
                            var pixel = game.add.graphics(x + col * pixelSize, y + row * pixelSize);
                            pixel.beginFill(0xff0000);
                            pixel.drawRect(10, 0, pixelSize, pixelSize);
                            pixel.endFill();
                        }
                    }
                }
            },
        
            startGame: function () {
        
                // Change the state back to Game.
                this.state.start('Game');
        
            }
        
        };