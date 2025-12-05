 var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyle_Key, textStyle_Value, difficulty, speedMultiplier;
        
var Game = {
        
    preload : function() {
        // Create simple colored squares instead of loading images
        // Snake will be green, apple will be red
    },
        
    create : function() {
        
        // By setting up global variables in the create function, we initialise them on game start.
        // We need them to be globally available so that the update function can alter them.
        
        // Get difficulty from global variable (set in menu)
        difficulty = difficulty || 'normal';
        
        // Set speed multiplier based on difficulty
        if(difficulty === 'easy') {
            speedMultiplier = 0.7;
        } else if(difficulty === 'normal') {
            speedMultiplier = 1;
        } else if(difficulty === 'hard') {
            speedMultiplier = 1.5;
        } else if(difficulty === 'extreme') {
            speedMultiplier = 2;
        }
        
        snake = [];                     // This will work as a stack, containing the parts of our snake
        apple = {};                     // An object for the apple;
        squareSize = 10;                // The length of a side of the squares. Reduced size.
        score = 0;                      // Game score.
        speed = 0;                      // Game speed.
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'right';            // The direction of our snake.
        new_direction = null;           // A buffer to store the new direction into.
        addNew = false;                 // A variable used when an apple has been eaten.
        
         // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();
        
        // Post-apocalyptic dark background
        game.stage.backgroundColor = 'red';
        
        // Draw post-apocalyptic cracked grid background
        var graphics = game.add.graphics(0, 0);
        // Rusted metal grid
        graphics.lineStyle(1, 0x3d2817, 0.5);
        for(var x = 0; x <= 600; x += squareSize) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, 450);
        }
        for(var y = 0; y <= 450; y += squareSize) {
            graphics.moveTo(0, y);
            graphics.lineTo(600, y);
        }
        
        // Add random rust spots and decay
        for(var i = 0; i < 50; i++) {
            var rx = Math.random() * 600;
            var ry = Math.random() * 450;
            var rustSpot = game.add.graphics(rx, ry);
            rustSpot.beginFill(0x4a2511, Math.random() * 0.3);
            rustSpot.drawCircle(0, 0, Math.random() * 15 + 5);
            rustSpot.endFill();
        }
        
        // Generate the initial snake stack. Our snake will be 10 elements long.
        // Beginning at X=150 Y=150 and increasing the X on every iteration.
        for(var i = 0; i < 10; i++){
            snake[i] = game.add.graphics(150+i*squareSize, 150);
            // Post-apocalyptic rusty metal segments with gradient
            var segmentColor = i === 9 ? 0x8b4513 : 0x654321; // Head is more rusty
            snake[i].beginFill(segmentColor, 0.9);
            snake[i].drawRect(0, 0, squareSize, squareSize);
            snake[i].endFill();
            // Add rusty border
            snake[i].lineStyle(1, 0x4a2511, 0.8);
            snake[i].drawRect(0, 0, squareSize, squareSize);
            // Add metal shine effect
            snake[i].beginFill(0xa0826d, 0.3);
            snake[i].drawRect(1, 1, squareSize-4, 2);
            snake[i].endFill();
        }
        
        // Genereate the first apple.
        this.generateApple();
        
        // Update HTML score displays
        document.getElementById('score-display').textContent = score;
        document.getElementById('speed-display').textContent = speed;
        document.getElementById('difficulty-display').textContent = difficulty.toUpperCase();
        
        // Set difficulty color
        var diffColor = '#ffff00';
        if(difficulty === 'easy') diffColor = '#00ff00';
        else if(difficulty === 'hard') diffColor = '#ff9900';
        else if(difficulty === 'extreme') diffColor = '#ff0000';
        document.getElementById('difficulty-display').style.color = diffColor;
        
    },
        
    update: function() {
        // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.
        
            if (cursors.right.isDown && direction!='left')
            {
                new_direction = 'right';
            }
            else if (cursors.left.isDown && direction!='right')
            {
                new_direction = 'left';
            }
            else if (cursors.up.isDown && direction!='down')
            {
                new_direction = 'up';
            }
            else if (cursors.down.isDown && direction!='up')
            {
                new_direction = 'down';
            }
        
            // A formula to calculate game speed based on the score and difficulty.
            // The higher the score, the higher the game speed, with a maximum of 10;
            speed = Math.min(10, Math.floor(score/5 * speedMultiplier));
            // Update speed value in HTML
            document.getElementById('speed-display').textContent = speed;
        
            // Since the update function of Phaser has an update rate of around 60 FPS,
            // we need to slow that down make the game playable.
        
            // Increase a counter on every update call.
            updateDelay++;
        
            // Do game stuff only if the counter is aliquot to (10 - the game speed).
            // The higher the speed, the more frequently this is fulfilled,
            // making the snake move faster. Adjusted by difficulty multiplier.
            var updateInterval = Math.max(1, Math.floor((10 - speed) / speedMultiplier));
            if (updateDelay % updateInterval == 0) {
        
                // Snake movement
        
                var firstCell = snake[snake.length - 1],
                    lastCell = snake.shift(),
                    oldLastCellx = lastCell.x,
                    oldLastCelly = lastCell.y;
        
                // If a new direction has been chosen from the keyboard, make it the direction of the snake now.
                if(new_direction){
                    direction = new_direction;
                    new_direction = null;
                }
        
                // Change the last cell's coordinates relative to the head of the snake, according to the direction.
        
                if(direction == 'right'){
                    lastCell.x = firstCell.x + squareSize;
                    lastCell.y = firstCell.y;
                }
                else if(direction == 'left'){
                    lastCell.x = firstCell.x - squareSize;
                    lastCell.y = firstCell.y;
                }
                else if(direction == 'up'){
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y - squareSize;
                }
                else if(direction == 'down'){
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y + squareSize;
                }
                
                if(addNew){
                    var newSegment = game.add.graphics(oldLastCellx, oldLastCelly);
                    // Post-apocalyptic rusty metal segment
                    newSegment.beginFill(0x654321, 0.9);
                    newSegment.drawRect(0, 0, squareSize, squareSize);
                    newSegment.endFill();
                    // Add rusty border
                    newSegment.lineStyle(1, 0x4a2511, 0.8);
                    newSegment.drawRect(0, 0, squareSize, squareSize);
                    // Add metal shine effect
                    newSegment.beginFill(0xa0826d, 0.3);
                    newSegment.drawRect(1, 1, squareSize-4, 2);
                    newSegment.endFill();
                    snake.unshift(newSegment);
                    addNew = false;
                }
    
            // Check for apple collision.
            this.appleCollision();
    
            // Check for collision with self. Parameter is the head of the snake.
            this.selfCollision(lastCell);
    
            // Check with collision with wall. Parameter is the head of the snake.
            this.wallCollision(lastCell);
        
                // Place the last cell in the front of the stack.
                // Mark it the first cell.
        
                snake.push(lastCell);
                firstCell = lastCell;
        
            }
    },
    appleCollision: function() {
    
        // Check if any part of the snake is overlapping the apple.
        // This is needed if the apple spawns inside of the snake.
        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == apple.x && snake[i].y == apple.y){
    
                // Next time the snake moves, a new block will be added to its length.
                addNew = true;
    
                // Destroy the old apple.
                apple.destroy();
    
                // Make a new one.
                this.generateApple();
    
                // Increase score.
                score++;
    
                // Refresh scoreboard in HTML
                document.getElementById('score-display').textContent = score;
    
            }
        }
    
    },
    
    selfCollision: function(head) {
    
        // Check if the head of the snake overlaps with any part of the snake.
        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){
    
                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
        }
    
    },
    
    wallCollision: function(head) {
    
        // Check if the head of the snake is in the boundaries of the game field.
    
        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){
    
            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
        }
    
    }, 
    generateApple: function(){
        
        // Chose a random place on the grid, avoiding the borders
        // X is between squareSize and (600 - 2*squareSize)
        // Y is between squareSize and (450 - 2*squareSize)
        
        var randomX = (Math.floor(Math.random() * 57) + 1) * squareSize,
            randomY = (Math.floor(Math.random() * 42) + 1) * squareSize;
        
        // Add a glowing radioactive waste barrel (post-apocalyptic food)
        apple = game.add.graphics(randomX, randomY);
        // Toxic green glowing barrel
        apple.beginFill(0x39ff14, 0.8);
        apple.drawRect(0, 0, squareSize, squareSize);
        apple.endFill();
        // Dark outline
        apple.lineStyle(2, 0x1a5c0a, 1);
        apple.drawRect(0, 0, squareSize, squareSize);
        // Glowing center
        apple.beginFill(0xccff00, 0.6);
        apple.drawRect(3, 3, squareSize-6, squareSize-6);
        apple.endFill();
    }
        
};
    