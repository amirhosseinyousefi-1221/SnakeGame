import "./App.css";
import React, { useEffect, useState } from "react";
import Board from "./Components";
import type Block from "./interfaces/block";
type Direction = "up" | "down" | "left" | "right";
const apple = { x: 10, y: 10 };
function App() {
  const [direction, setDirection] = useState<Direction>("down");
  const [apple, setApple] = useState<Block>({ x: 10, y: 10 });
  const [snake, setSnake] = useState<Array<Block>>([
    { x: 13, y: 1 },
    { x: 12, y: 1 },
    { x: 11, y: 1 },
  ]);
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

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Board apple={apple} snake={snake} />;
    </div>
  );
}

export default App;
