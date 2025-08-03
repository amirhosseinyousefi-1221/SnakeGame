import clsx from "clsx";
import React from "react";
import type Block from "../interfaces/block";
interface BoardProps {
  apple: Block;
  snake: Block[];
}
function Board({ apple, snake }: BoardProps) {
  const blocks = new Array(900).fill(0);

  return (
    <div className="bg-black  grid grid-cols-30 border-2 border-red-500 gap-0 justify-center items-center ">
      {blocks.map((_, index) => {
        const currentX = index % 30;
        const currentY = Math.floor(index / 30);

        return (
          <div
            key={index}
            className={clsx(" border border-white w-8 h-8 ", {
              "bg-red-500": currentX === apple.x && currentY === apple.y,
              "bg-green-500": snake.some(
                (block) => block.x === currentX && block.y === currentY
              ),
            })}
          ></div>
        );
      })}
    </div>
  );
}

export default Board;
