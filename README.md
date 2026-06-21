# Realmline

**CID:** 02601389

Realmline is an original two-player, turn-based territory game. Red and Blue begin with two fixed pieces each, then place their remaining pieces onto a 7 by 7 board. After setup, each turn has a simple rhythm: choose one of your pieces, move it zero, one, or two orthogonal squares, then build one permanent wall beside the piece you moved.

The board starts open, so early moves feel quite free. As the walls go up, the game becomes tighter and more tactical. The aim is not just to move into space, but to shape the board so that your pieces end up inside territories your opponent cannot share. A territory only scores when it contains pieces from one player; mixed territories are still contested and score for nobody.

I wanted the game to feel easy to begin but interesting to finish. A good turn can claim space for yourself, block a larger plan from the other player, or keep a territory open until the timing is better.

## How to Play

1. Red and Blue each start with two fixed pieces.
2. The four remaining pieces are placed in this order: Red, Blue, Blue, Red.
3. On your turn, select one of your pieces.
4. Move it zero, one, or two squares in a straight orthogonal line. Pieces cannot move diagonally, through walls, through other pieces, or off the board.
5. Build one wall on an open edge beside the piece you just moved.
6. Keep playing until the board is separated, one player has an uncatchable lead, or the current player has no legal move.
7. Each single-player territory scores one point per cell. If the total score is tied, the largest single territory is used as the tie-break.

The interface shows whose turn it is, the current phase, live territory scores, available moves, available wall placements, and the final result.

The opening screen includes an original Realmline cover image showing the red and blue round pieces and wall segments used by the game.

## Run the Game

Install the project dependencies:

```powershell
npm install
```

Start the included cross-platform local web server:

```powershell
npm start
```

Then open:

```text
http://127.0.0.1:5500/index.html
```

Using a local web server is recommended because the browser loads the JavaScript files as ES modules. Some browsers may block module imports when `index.html` is opened directly as a local file.

## Run Checks

Run the unit tests:

```powershell
npm test
```

Run the linter:

```powershell
npm run lint
```

Regenerate the JSDoc documentation:

```powershell
npm run docs
```

Current verification:

- The module test suite contains 22 behaviour-focused tests.
- The tests cover setup, placement order, movement, wall placement, territory scoring, draw handling, and game-over conditions.
- `web-app/main.js` passes a JavaScript syntax check with Node.

## Project Structure

- `web-app/Module.js` contains the game module API and implementation.
- `web-app/tests/realmline.test.js` contains the unit tests for the game module.
- `web-app/index.html` contains the page structure.
- `web-app/default.css` contains the visual styling.
- `web-app/main.js` connects the browser interface to the game module.
- `docs/` contains the generated JSDoc documentation.

The game rules live in `Module.js`, where they can be tested without the browser. The web app imports and calls this module rather than re-implementing the rules inside the interface code.

## Assessment Checklist

### Game Module - API

- `web-app/Module.js` exports a documented JavaScript API for creating game states, placing pieces, finding legal moves, moving pieces, placing walls, scoring territories, checking game-over conditions, and summarising the current state.
- The exported functions are documented with JSDoc, and generated documentation is included in `docs/`.

### Game Module - Implementation

- The module implements the documented API in JavaScript.
- Game operations return new state objects instead of mutating the previous state.
- The implementation uses functional patterns such as `map`, `filter`, `reduce`, `flatMap`, and recursion where they fit the problem.
- Linting can be run with `npm run lint`.

### Unit Tests - Specification

- The tests describe the expected behaviour of the original two-player rules.
- They focus on placement order, legal movement, wall placement, territory scoring, draw handling, and game-ending conditions.

### Unit Tests - Implementation

- The tests are implemented in `web-app/tests/realmline.test.js`.
- They examine the public module API rather than browser behaviour.
- They can be run with `npm test`.

### Web Application

- The app provides a browser-based interface for playing Realmline.
- HTML, CSS, and JavaScript are separated into `index.html`, `default.css`, and `main.js`.
- The interface uses the game module for rules and state transitions.
- The UI includes keyboard-accessible board cells, status messages, live score updates, undo, restart, sound toggle, and a final result panel.
- The current turn is shown with text and colour, so it is still understandable without relying on colour alone.
- Board cells expose clearer accessibility labels, including piece ownership, legal placement targets, selected pieces, and legal move targets.
- The step guide marks the current step with `aria-current`, and the board has hidden keyboard instructions for screen reader users.
- Motion effects respect `prefers-reduced-motion`.
