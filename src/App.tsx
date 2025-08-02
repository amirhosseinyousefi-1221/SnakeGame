import "./App.css";
import React, { useEffect } from "react";
import Board from "./Components";
const apple = { x: 10, y: 10 };
function App() {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {}, 1000);
  // }, []);
  return (
    <Board
      apple={apple}
      snake={[
        { x: 13, y: 1 },
        { x: 12, y: 1 },
        { x: 11, y: 1 },
      ]}
    />
  );
}

export default App;
