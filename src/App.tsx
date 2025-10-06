import "./App.css";
import React, { useEffect, useState } from "react";
import Board from "./Components";
import type Block from "./interfaces/block";
import type { KnownAsTypeMap } from "vite";
type Direction = "up" | "down" | "left" | "right";
const apple = { x: 5, y: 5 };
function App() {
  const randomAppleGenerator = (snake: Block[]): Block => {
    // generating a new random apple
    //// There's a Problem after hitting a random block that the Snake has it
    const xOfApple = Math.floor(Math.random() * 10);
    const yOfApple = Math.floor(Math.random() * 10);
    const newApple = { x: xOfApple, y: yOfApple };
    const hasInValidApple = snake.find(
      (block: Block) => block.x === newApple.x && block.y === newApple.y
    );
    if (hasInValidApple) console.log(hasInValidApple.x, hasInValidApple.y);

    return hasInValidApple ? randomAppleGenerator(snake) : newApple;
  };
  //   const randomAppleGenerator = (snake: Block[]): Block => {
  //   const gridSize = 10;
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
    // Check if Snake ate an apple

    return snake.filter((block) => block.x === apple.x && block.y === apple.y)
      .length > 0
      ? true
      : false;
  };
  const [direction, setDirection] = useState<Direction>("down");
  const [snake, setSnake] = useState<Array<Block>>([
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
  ]);
  const [apple, setApple] = useState<Block>({
    x: 5, y: 5
  });

  useEffect(() => {
    //// Snake Movement
    const timer = setInterval(() => {
      setSnake((snake) => {
        const newSnake = [...snake];
        newSnake.pop();
        const head = newSnake[0];
        switch (direction) {
          case "up":
            return [{ x: head.x, y: (head.y - 1 + 10) % 10 }, ...newSnake];
          case "down":
            return [{ x: head.x, y: (head.y + 1 + 10) % 10 }, ...newSnake];
          case "right":
            return [{ x: (head.x + 1 + 10) % 10, y: head.y }, ...newSnake];
          case "left":
            return [{ x: (head.x - 1 + 10) % 10, y: head.y }, ...newSnake];
        }
      });
    }, 150);
    return () => clearInterval(timer);
  }, [direction]);

  useEffect(() => {
    /// Change Directions and prevent the screen from scrolling
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
    /// Losing the game Condition
    if (snake.length >= 3) {
      const head = snake[0];
      const otherThanHead = [...snake];
      otherThanHead.shift();
      const losingCondition = otherThanHead.filter(
        (block: Block) => block.x === head.x && block.y === head.y
      );
      if (losingCondition.length > 0) {
        alert(`Game Over !\n Click "OK" or Enter to Try Again`);
        location.reload();
      }
    }
  }, [snake]);

  useEffect(() => {
    /// Snake length incrementing and random apple generating
    if (checkEatingApple(apple, snake)) {
      if (snake.length >= 3) {
        const cloneSnake = [...snake];
        const lastBlock = cloneSnake.at(-1) as Block;
        const secondLast = cloneSnake.at(-2) as Block;
        if (lastBlock.x > secondLast.x) {
          setSnake([...snake, { x: lastBlock.x + 1, y: lastBlock.y }]);
        } else if (lastBlock.y > secondLast.y) {
          setSnake([...snake, { x: lastBlock.x, y: lastBlock.y - 1 }]);
        } else if (lastBlock.x < secondLast.x) {
          setSnake([...snake, { x: lastBlock.x + 1, y: lastBlock.y }]);
        } else {
          setSnake([...snake, { x: lastBlock.x, y: lastBlock.y + 1 }]);
        }
      }
      // Adding the head to the Snake
      // const head = { ...apple };
      // setSnake([head, ...snake]);

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
