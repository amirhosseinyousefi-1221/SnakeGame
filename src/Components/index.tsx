import clsx from "clsx";
import React from "react";
import type Block from "../interfaces/block";
interface BoardProps {
  apple: Block;
  snake: Block[];
}
function Board({ apple, snake }: BoardProps) {
  const blocks = new Array(100).fill(0);
  const headx = snake[0].x;
  const heady = snake[0].y;

  return (
    <div className="bg-gray-700 grid grid-cols-10 border-3 border-black gap-0 justify-center items-center ">
      {blocks.map((_, index) => {
        const currentX = index % 10;
        const currentY = Math.floor(index / 10);
        return (
          <div
            key={index}
            className={clsx(" border border-white w-8 h-8 rounded-[3px] ", {
              "bg-red-500": currentX === apple.x && currentY === apple.y,
              "bg-green-500": snake.some(
                (block) => block.x === currentX && block.y === currentY
              ),
              "bg-sky-400 border-red": snake.some(
                (block) => headx === currentX && heady === currentY
              ),
            })}
          ></div>
        );
      })}
    </div>
  );
}

export default Board;
