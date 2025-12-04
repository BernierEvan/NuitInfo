// Add all game states
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

// Start with the menu
game.state.start('Menu');