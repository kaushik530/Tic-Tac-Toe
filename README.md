# Tic-Tac-Toe

A browser-based Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript.

## Features

- Player vs Player mode
- Player vs Computer mode
- Custom player names
- Random-move computer opponent
- Win detection for rows, columns, and diagonals
- Draw detection
- Animated winning line
- Game reset functionality
- Interactive game setup flow
- Responsive visual feedback for buttons and cells

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)

## JavaScript Concepts Practiced

This project focuses on JavaScript fundamentals and modular code organization.

- IIFEs (Immediately Invoked Function Expressions)
- Factory functions
- Closures and private state
- DOM manipulation
- Event listeners
- Event delegation
- Arrays and array methods
- Conditional logic
- State management
- Separation of game logic and UI logic

## Game Flow

1. Click **Play**.
2. Enter the player names.
3. Choose between:
   - **Player** — Player vs Player
   - **Bot** — Player vs Computer

4. Player 1 starts the game.
5. The game ends when a player wins or the board is full.
6. Click **Reset** to return to the initial state.

## Computer Opponent

The computer currently uses a simple random-move strategy. It selects one of the available cells at random.

The bot is intentionally simple since the primary goal of this project is practicing JavaScript architecture, DOM manipulation, and state management rather than implementing an advanced game-playing algorithm.

## Project Structure

```text
tic-tac-toe/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Future Improvements

Possible additions include:

- Smarter computer opponent
- Difficulty levels
- Score tracking
- Improved animations
- Mobile layout improvements
- Game history
- Sound effects

## What I Learned

This project helped me practice structuring a JavaScript application using modules and factory functions instead of keeping all game logic in global variables and functions. It also provided practice with DOM events, state management, and separating the game logic from the UI.

## License

This project is for learning and educational purposes.
