import "./App.css";
import React, { useEffect, useState } from "react";
import Board from "./Components";
import type Block from "./interfaces/block";
type Direction = "up" | "down" | "left" | "right";
const apple = { x: 10, y: 10 };
function App() {
  const randomAppleGenerator = (snake: Block[]): Block => {
    //// There's a Problem after hitting a random block that the Snake has it
    const xOfApple = Math.floor(Math.random() * 30);
    const yOfApple = Math.floor(Math.random() * 30);
    const newApple = { x: xOfApple, y: yOfApple };
    const unValidApple = snake.filter(
      (block: Block) => block.x === newApple.x && block.y === newApple.y
    );
    console.log("apple :", newApple);
    console.log("unvalid apple :", unValidApple);
    return unValidApple.length > 0 ? randomAppleGenerator(snake) : newApple;
  };
  //   const randomAppleGenerator = (snake: Block[]): Block => {
  //   const gridSize = 30;
  //   const allPositions: Block[] = [];

  //   for (let x = 0; x < gridSize; x++) {
  //     for (let y = 0; y < gridSize; y++) {
  //       allPositions.push({ x, y });
  //     }
  //   }

  //   const snakeSet = new Set(snake.map(b => `${b.x},${b.y}`));
  //   const validPositions = allPositions.filter(
  //     pos => !snakeSet.has(`${pos.x},${pos.y}`)
  //   );

  //   if (validPositions.length === 0) {
  //     throw new Error("No valid positions left for apple!");
  //   }

  //   const randomIndex = Math.floor(Math.random() * validPositions.length);
  //   return validPositions[randomIndex];
  // };

  const checkEatingApple = (apple: Block, snake: Block[]): boolean => {
    return snake.filter((block) => block.x === apple.x && block.y === apple.y)
      .length > 0
      ? true
      : false;
  };
  const [direction, setDirection] = useState<Direction>("down");
  const [snake, setSnake] = useState<Array<Block>>([
    { x: 13, y: 1 },
    { x: 12, y: 1 },
    { x: 11, y: 1 },
  ]);
  const [apple, setApple] = useState<Block>(randomAppleGenerator(snake));

  useEffect(() => {
    const timer = setInterval(() => {
      setSnake((snake) => {
        const newSnake = [...snake];
        newSnake.pop();
        const head = newSnake[0];
        switch (direction) {
          case "up":
            return [{ x: head.x, y: (head.y - 1 + 30) % 30 }, ...newSnake];
          case "down":
            return [{ x: head.x, y: (head.y + 1 + 30) % 30 }, ...newSnake];
          case "right":
            return [{ x: (head.x + 1 + 30) % 30, y: head.y }, ...newSnake];
          case "left":
            return [{ x: (head.x - 1 + 30) % 30, y: head.y }, ...newSnake];
        }
      });
    }, 300);
    return () => clearInterval(timer);
  }, [direction]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)
      ) {
        e.preventDefault();
      }
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "up" && direction !== "down") {
            setDirection("up");
          }
          event.preventDefault();
          break;
        case "ArrowDown":
          if (direction !== "down" && direction !== "up") {
            setDirection("down");
          }
          event.preventDefault();
          break;
        case "ArrowLeft":
          if (direction !== "left" && direction !== "right") {
            setDirection("left");
          }
          break;
        case "ArrowRight":
          if (direction !== "right" && direction !== "left") {
            setDirection("right");
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (checkEatingApple(apple, snake)) {
      const head = { ...apple };
      setSnake([head, ...snake]);
      setApple(randomAppleGenerator(snake));
    }
  }, [snake]);
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Board apple={apple} snake={snake} />;
    </div>
  );
}

export default App;
