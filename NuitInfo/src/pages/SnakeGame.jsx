import React, { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 20;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const SnakeGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const snake = useRef([{ x: 10, y: 10 }]);
    const direction = useRef({ x: 1, y: 0 });
    const food = useRef({ x: 15, y: 15 });

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const gameLoop = setInterval(() => {
            // Update snake position
            const head = { ...snake.current[0] };
            head.x += direction.current.x;
            head.y += direction.current.y;

            // Check wall collision
            if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
                setGameOver(true);
                return;
            }

            // Check self collision
            for (let segment of snake.current) {
                if (segment.x === head.x && segment.y === head.y) {
                    setGameOver(true);
                    return;
                }
            }

            snake.current.unshift(head);

            // Check food collision
            if (head.x === food.current.x && head.y === food.current.y) {
                setScore(prev => prev + 10);
                food.current = {
                    x: Math.floor(Math.random() * GRID_WIDTH),
                    y: Math.floor(Math.random() * GRID_HEIGHT),
                };
            } else {
                snake.current.pop();
            }

            // Draw
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = '#39ff14';
            snake.current.forEach((segment, index) => {
                ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
                if (index === 0) {
                    ctx.fillStyle = '#50ff30';
                    ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
                    ctx.fillStyle = '#39ff14';
                }
            });

            // Draw food (radioactive)
            ctx.fillStyle = '#ff1439';
            ctx.fillRect(food.current.x * CELL_SIZE, food.current.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
            ctx.strokeStyle = '#ff1439';
            ctx.strokeRect(food.current.x * CELL_SIZE - 2, food.current.y * CELL_SIZE - 2, CELL_SIZE + 2, CELL_SIZE + 2);
        }, 150);

        return () => clearInterval(gameLoop);
    }, [gameStarted, gameOver]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
                return;
            }

            if (!gameStarted) {
                setGameStarted(true);
            }

            const key = e.key;
            if (key === 'ArrowUp' && direction.current.y === 0) {
                direction.current = { x: 0, y: -1 };
            } else if (key === 'ArrowDown' && direction.current.y === 0) {
                direction.current = { x: 0, y: 1 };
            } else if (key === 'ArrowLeft' && direction.current.x === 0) {
                direction.current = { x: -1, y: 0 };
            } else if (key === 'ArrowRight' && direction.current.x === 0) {
                direction.current = { x: 1, y: 0 };
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, onClose]);

    const resetGame = () => {
        snake.current = [{ x: 10, y: 10 }];
        direction.current = { x: 1, y: 0 };
        food.current = { x: 15, y: 15 };
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-cyan-400 hover:text-white text-2xl font-bold"
            >
                ✕
            </button>

            <h1 className="text-4xl mb-8 glitch-text text-cyan-400" data-text="BUNKER_SNAKE">BUNKER_SNAKE</h1>
            <p className="mb-4 text-cyan-400/60 font-mono">En l'honneur d'Ada Lovelace</p>

            <div className="border-4 border-cyan-400 p-1 relative">
                <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none animate-pulse"></div>
                <canvas
                    ref={canvasRef}
                    width={GRID_WIDTH * CELL_SIZE}
                    height={GRID_HEIGHT * CELL_SIZE}
                    className="bg-black block"
                ></canvas>
                {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center">
                            <h2 className="text-2xl text-red-500 mb-4">CONTAMINATED</h2>
                            <p className="mb-4 text-cyan-400">FINAL SCORE: {score}</p>
                            <button onClick={resetGame} className="border border-cyan-400 px-4 py-2 hover:bg-cyan-400 hover:text-black text-cyan-400 mr-2">RESTART</button>
                            <button onClick={onClose} className="border border-red-500 px-4 py-2 hover:bg-red-500 hover:text-black text-red-500">EXIT</button>
                        </div>
                    </div>
                )}
                {!gameStarted && !gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center">
                            <p className="text-xl animate-pulse text-cyan-400">PRESS ANY ARROW KEY TO START</p>
                        </div>
                    </div>
                )}
            </div>
            <p className="mt-4 text-xl text-cyan-400">RATIONS COLLECTED: {score}</p>
            <p className="mt-4 text-sm text-cyan-400/50">Use Arrow Keys to Navigate | ESC to Exit</p>
        </div>
    );
};

export default SnakeGame;
