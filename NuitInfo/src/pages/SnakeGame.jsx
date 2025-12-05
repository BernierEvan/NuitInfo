import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../snake/snake.css';

const GRID_WIDTH = 60; // 600px / 10
const GRID_HEIGHT = 45; // 450px / 10
const CELL_SIZE = 10;

const SnakeGame = ({ onClose }) => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('MENU'); // MENU, PLAYING, GAMEOVER
    const [difficulty, setDifficulty] = useState('normal');
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [showNirdMessage, setShowNirdMessage] = useState(false);

    // Game State Refs (mutable without re-render)
    const snake = useRef([]);
    const apple = useRef({});
    const direction = useRef('right');
    const nextDirection = useRef('right');
    const updateDelay = useRef(0);
    const gameLoopRef = useRef(null);

    // --- Helpers ---
    const getSpeedMultiplier = (diff) => {
        switch (diff) {
            case 'easy': return 0.7;
            case 'hard': return 1.5;
            case 'extreme': return 2;
            default: return 1;
        }
    };

    const initGame = () => {
        snake.current = [];
        // Initialize snake (10 segments)
        for (let i = 0; i < 10; i++) {
            snake.current.push({ x: 15 + i, y: 15 });
        }
        generateApple();
        direction.current = 'right';
        nextDirection.current = 'right';
        setScore(0);
        setSpeed(0);
        updateDelay.current = 0;
        setGameState('PLAYING');
    };

    const generateApple = () => {
        // Random position avoiding borders (1 cell margin)
        const x = Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1;
        const y = Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1;
        apple.current = { x, y };
    };

    // --- Drawing Functions ---
    const draw = (ctx) => {
        // 1. Background (Post-apocalyptic dark background)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Grid (Cyber grid)
        ctx.strokeStyle = 'rgba(0, 204, 204, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= ctx.canvas.width; x += CELL_SIZE) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
        }
        for (let y = 0; y <= ctx.canvas.height; y += CELL_SIZE) {
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
        }
        ctx.stroke();

        // Cyber spots (Random glitch spots)
        for (let i = 0; i < 50; i++) {
            const rx = (i * 137) % ctx.canvas.width;
            const ry = (i * 293) % ctx.canvas.height;
            const radius = 5 + (i % 15);
            const alpha = 0.05 + (i % 3) * 0.05;

            ctx.fillStyle = `rgba(0, 204, 204, ${alpha})`;
            ctx.beginPath();
            ctx.arc(rx, ry, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        if (gameState === 'PLAYING' || gameState === 'GAMEOVER') {
            // 2. Apple (Energy Cell)
            const ax = apple.current.x * CELL_SIZE;
            const ay = apple.current.y * CELL_SIZE;

            // Cyan body
            ctx.fillStyle = 'rgba(0, 204, 204, 0.8)';
            ctx.fillRect(ax, ay, CELL_SIZE, CELL_SIZE);

            // White outline
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(ax, ay, CELL_SIZE, CELL_SIZE);

            // Glowing center
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(ax + 3, ay + 3, CELL_SIZE - 6, CELL_SIZE - 6);

            // 3. Snake
            snake.current.forEach((segment, i) => {
                const sx = segment.x * CELL_SIZE;
                const sy = segment.y * CELL_SIZE;

                // Cyan metal color
                ctx.fillStyle = 'rgba(0, 204, 204, 0.9)';
                ctx.fillRect(sx, sy, CELL_SIZE, CELL_SIZE);

                // Cyan border
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.lineWidth = 1;
                ctx.strokeRect(sx, sy, CELL_SIZE, CELL_SIZE);

                // Shine effect
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fillRect(sx + 1, sy + 1, CELL_SIZE - 4, 2);
            });
        }
    };

    // --- Game Logic ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const loop = () => {
            if (gameState === 'PLAYING') {
                // Update Logic
                const speedMultiplier = getSpeedMultiplier(difficulty);
                const currentSpeed = Math.min(10, Math.floor(score / 5 * speedMultiplier));
                setSpeed(currentSpeed);

                updateDelay.current++;
                const updateInterval = Math.max(1, Math.floor((10 - currentSpeed) / speedMultiplier));

                if (updateDelay.current % updateInterval === 0) {
                    // Move Snake
                    direction.current = nextDirection.current;
                    const head = { ...snake.current[snake.current.length - 1] };

                    if (direction.current === 'right') head.x += 1;
                    else if (direction.current === 'left') head.x -= 1;
                    else if (direction.current === 'up') head.y -= 1;
                    else if (direction.current === 'down') head.y += 1;

                    // Collision Checks
                    // Wall
                    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
                        setGameState('GAMEOVER');
                        return;
                    }
                    // Self
                    for (let i = 0; i < snake.current.length - 1; i++) {
                        if (head.x === snake.current[i].x && head.y === snake.current[i].y) {
                            setGameState('GAMEOVER');
                            return;
                        }
                    }

                    // Apple
                    let grew = false;
                    if (head.x === apple.current.x && head.y === apple.current.y) {
                        setScore(s => s + 1);
                        generateApple();
                        grew = true;
                    }

                    snake.current.push(head);
                    if (!grew) {
                        snake.current.shift();
                    }
                }
            }

            // Render every frame
            draw(ctx);
        };

        gameLoopRef.current = setInterval(loop, 1000 / 60); // 60 FPS
        return () => clearInterval(gameLoopRef.current);
    }, [gameState, difficulty, score]);

    // --- Input Handling ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'PLAYING') return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction.current !== 'down') nextDirection.current = 'up';
                    break;
                case 'ArrowDown':
                    if (direction.current !== 'up') nextDirection.current = 'down';
                    break;
                case 'ArrowLeft':
                    if (direction.current !== 'right') nextDirection.current = 'left';
                    break;
                case 'ArrowRight':
                    if (direction.current !== 'left') nextDirection.current = 'right';
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    // NIRD Message Logic
    useEffect(() => {
        // Show NIRD message after 1 second
        const timer1 = setTimeout(() => {
            setShowNirdMessage(true);
        }, 1000);

        // Auto-close after 10 seconds
        const timer2 = setTimeout(() => {
            setShowNirdMessage(false);
        }, 11000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handleBack = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/');
        }
    };

    // Pixel Skull Component
    const PixelSkull = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 8px)', gap: '0' }}>
                {/* Row 0 */}
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                {/* Row 1 */}
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                {/* Row 2 */}
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                {/* Row 3 */}
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                {/* Row 4 */}
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                {/* Row 5 */}
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                <div className="bg-[rgba(0, 204, 204, 0.8)] w-2 h-2"></div>
                {/* Row 6 */}
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                {/* Row 7 */}
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
                <div className="bg-[#00cccc] w-2 h-2"></div>
                <div className="bg-transparent w-2 h-2"></div>
            </div>
        </div>
    );

    return (
        <div className="snake-game-body">
            {/* Title */}
            <div id="game-title">SNAKE v2.45</div>

            {/* Back Button */}
            <button
                id="back-to-menu"
                onClick={handleBack}
            >
                Menu
            </button>

            {/* NIRD Easter Egg Message */}
            {showNirdMessage && (
                <div id="nird-easter-egg" style={{ display: 'block' }}>
                    <button className="close-btn" onClick={() => setShowNirdMessage(false)}>×</button>
                    <pre className="nird-avatar-small">
                        {`  /\\_/\\
 (^-^)
  >^<`}
                    </pre>
                    <strong>🎮 NIRD :</strong> Tu as trouvé mon Easter Egg ! Le Snake post-apo ! Amuse-toi bien, humain ! ░▓
                </div>
            )}

            <div id="game-wrapper">
                {/* Score Panel */}
                <div id="score-panel">
                    <div className="score-item">
                        <div className="score-label">Score</div>
                        <div className="score-value" id="score-display">{score}</div>
                    </div>
                    <div className="score-item">
                        <div className="score-label">Speed</div>
                        <div className="score-value" id="speed-display">{speed}</div>
                    </div>
                    <div className="score-item">
                        <div className="score-label">Difficulty</div>
                        <div
                            className="score-value"
                            id="difficulty-display"
                            style={{
                                color: difficulty === 'easy' ? '#00ffff' :
                                    difficulty === 'hard' ? '#00aaaa' :
                                        difficulty === 'extreme' ? '#008888' : '#00cccc',
                                fontSize: '20px'
                            }}
                        >
                            {difficulty.toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Game Container */}
                <div id="game-container">
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={450}
                        style={{ display: 'block' }}
                    />

                    {/* MENU OVERLAY */}
                    {gameState === 'MENU' && (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 20
                        }}>
                            <h1 style={{
                                fontSize: '60px',
                                fontWeight: 'bold',
                                color: '#00cccc',
                                marginBottom: '30px',
                                letterSpacing: '10px',
                                textShadow: '0 0 15px rgba(0,204,204,0.8)',
                                fontFamily: "'Courier New', monospace"
                            }}>SNAKE</h1>

                            <div style={{ marginBottom: '30px', display: 'flex', gap: '15px' }}>
                                {['easy', 'normal', 'hard', 'extreme'].map(diff => (
                                    <button
                                        key={diff}
                                        onClick={() => setDifficulty(diff)}
                                        style={{
                                            padding: '10px 20px',
                                            border: difficulty === diff ? '3px solid #00cccc' : '2px solid rgba(0,204,204,0.3)',
                                            backgroundColor: difficulty === diff ? 'rgba(0,204,204,1)' : 'rgba(0,204,204,0.1)',
                                            color: difficulty === diff ? '#000' : '#00cccc',
                                            fontFamily: "'Courier New', monospace",
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={initGame}
                                style={{
                                    padding: '15px 50px',
                                    backgroundColor: '#000',
                                    border: '4px solid #00cccc',
                                    color: '#00cccc',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    letterSpacing: '5px',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 20px rgba(0,204,204,0.4)',
                                    fontFamily: "'Courier New', monospace"
                                }}
                            >
                                START
                            </button>
                            <p style={{ marginTop: '20px', color: 'rgba(0,204,204,0.6)', fontSize: '12px' }}>PRESS START TO INITIALIZE PROTOCOL</p>
                        </div>
                    )}

                    {/* GAME OVER OVERLAY */}
                    {gameState === 'GAMEOVER' && (
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 20
                        }}>
                            <h2 style={{
                                fontSize: '48px',
                                fontWeight: 'bold',
                                color: '#00cccc',
                                marginBottom: '10px',
                                letterSpacing: '5px',
                                textShadow: '0 0 15px rgba(0,204,204,0.8)',
                                fontFamily: "'Courier New', monospace"
                            }}>GAME OVER</h2>

                            <PixelSkull />

                            <p style={{ color: '#00cccc', marginBottom: '10px', fontSize: '20px', fontFamily: "'Courier New', monospace", fontWeight: 'bold' }}>LAST SCORE</p>
                            <p style={{ color: '#00cccc', marginBottom: '10px', fontSize: '32px', fontFamily: "'Courier New', monospace", fontWeight: 'bold' }}>{score}</p>
                            <p style={{
                                color: difficulty === 'easy' ? '#00ff00' :
                                    difficulty === 'hard' ? '#00aaaa' :
                                        difficulty === 'extreme' ? '#008888' : '#00cccc',
                                marginBottom: '30px',
                                fontSize: '16px',
                                fontFamily: "'Courier New', monospace",
                                fontWeight: 'bold'
                            }}>
                                DIFFICULTY: {difficulty.toUpperCase()}
                            </p>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <button
                                    onClick={initGame}
                                    style={{
                                        padding: '10px 30px',
                                        border: '3px solid #00cccc',
                                        backgroundColor: '#000',
                                        color: '#00cccc',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: '24px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = '#ffffff';
                                        e.target.style.backgroundColor = 'rgba(0,0,0,0.9)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = '#00cccc';
                                        e.target.style.backgroundColor = '#000';
                                    }}
                                >
                                    RETRY
                                </button>
                                <button
                                    onClick={() => setGameState('MENU')}
                                    style={{
                                        padding: '10px 30px',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        backgroundColor: 'transparent',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        fontFamily: "'Courier New', monospace"
                                    }}
                                >
                                    MENU
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;
