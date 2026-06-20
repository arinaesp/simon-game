# Simon Game

A browser-based memory game, originally built as a course project and later enhanced with Claude Code as an AI pair-programming agent.

# Built by Me (v1 - Base Project)

The original Simon game was built using jQuery and follows the classic gameplay loop: the game plays a random sequence of colors, the player repeats it back, and the sequence grows by one color each round.

Core implementation:

- Random sequence generation using Math.random() mapped to four colors
- Click and keyboard event handling with jQuery ($(".btn").on("click"), $(document).on("keydown"))
- Sequence playback using fadeOut/fadeIn animations and setTimeout
- Audio playback per color using the Audio() constructor
- Game-over detection with a red flash effect and automatic restart on next keypress

Core skills demonstrated:

- DOM event handling and jQuery selectors
- State management using plain variables (level, pattern arrays, started flag)
- Basic CSS styling and layout for a grid-based game board
- Audio triggering tied to user and game events

# Upgraded with Claude Code (v2 - Feature Expansion)

Using Claude Code as a pair-programming agent, the base game was extended with gameplay improvements, bug fixes, and a full visual redesign.

Gameplay and logic improvements:

- Progressive difficulty: sequence playback speed increases with each level (stepSpeed()), with a defined floor so the game does not become unplayably fast
- Input locking during sequence playback (showingPattern flag) to prevent the player from clicking while the pattern is being shown
- Persistent high score tracking using localStorage, so the best level reached is saved across browser sessions
- Timing bug fix in the sequence playback function: the previous version waited one full extra step longer than necessary before re-enabling player input; the corrected version calculates wait time based on when the last button actually finishes its animation

Visual and UI overhaul:

- Restructured markup into semantic sections (header, status bar, game board, footer) with a level/high-score display
- New visual theme using CSS custom properties (CSS variables) for a consistent color palette across normal and "lit" button states
- Added a scanline overlay effect and a full-screen flash animation on game-over for stronger visual feedback
- Added a shake animation on incorrect input and a pulse animation on level-up, both implemented with CSS keyframes
- Responsive layout adjustments for smaller screens via a media query
- Updated typography (Press Start 2P, Bebas Neue) for a retro arcade aesthetic

Skills demonstrated through AI-assisted development:

- Directing an AI coding agent to identify and fix a timing/logic bug in existing game code
- Reviewing and validating AI-suggested changes against the original game logic
- Iterative prompt-based development, including requesting both functional improvements and visual redesign in separate passes

# Summary

Started as a hand-built jQuery memory game following standard course material; evolved into a more polished, accurate, and persistent game experience through AI-assisted development with Claude Code, including a real bug fix in the original timing logic and a complete visual redesign.

# Tech Stack

- HTML5 / CSS3
- jQuery
- Vanilla JavaScript
- Web Storage API (localStorage)
- Google Fonts (Press Start 2P, Bebas Neue)

# Usage

1. Clone the repo
2. Open index.html in a browser
3. Press any key or click a button to start
4. Repeat the color sequence shown; the sequence grows by one color each round
5. High score is automatically saved in your browser between sessions

---

Made by Irishka eje in San Francisco.
