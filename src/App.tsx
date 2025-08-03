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
    { x: 10, y: 1 },
    { x: 9, y: 1 },
  ]);
  useEffect(() => {
    const timer = setInterval(() => {
      switch (direction) {
        case "up":
          setSnake((snake) => {
            const newSnake = [...snake];
            const tail = newSnake.pop();
            const head = newSnake[0];
            return [{ x: head.x, y: head.y - 1 }, ...newSnake];
          });
          break;
        case "down":
          setSnake((snake) => {
            const newSnake = [...snake];
            const tail = newSnake.pop();
            const head = newSnake[0];
            return [{ x: head.x, y: head.y + 1 }, ...newSnake];
          });
          break;
        case "right":
          setSnake((snake) => {
            const newSnake = [...snake];
            const tail = newSnake.pop();
            const head = newSnake[0];
            return [{ x: head.x + 1, y: head.y }, ...newSnake];
          });
          break;
        case "left":
          setSnake((snake) => {
            const newSnake = [...snake];
            const tail = newSnake.pop();
            const head = newSnake[0];
            return [{ x: head.x - 1, y: head.y }, ...newSnake];
          });
          break;
      }
    }, 300);
    return () => clearInterval(timer);
  }, [direction]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "up") {
            setDirection("up");
          }
          event.preventDefault();
          break;
        case "ArrowDown":
          if (direction !== "down") {
            setDirection("down");
          }
          event.preventDefault();
          break;
        case "ArrowLeft":
          if (direction !== "left") {
            setDirection("left");
          }
          break;
        case "ArrowRight":
          if (direction !== "right") {
            setDirection("right");
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <Board apple={apple} snake={snake} />;
}

export default App;
