//========= experiments zone ===========
// > learn different concepts
// > create custom components
// > create custom utils etc.

"use client";
import { useEffect, useRef } from "react";
import "./style.css";

// [currently learning]: HTML CANVAS

const ExperimentWindow = () => {
  let testCanvasRef = useRef<any>(null);

  const renderCanvas = () => {
    testCanvasRef.current.width = 600;
    testCanvasRef.current.height = 400;

    let canvasContext = testCanvasRef.current.getContext("2d");

    // rectangle
    canvasContext.fillStyle = "lightgreen";
    canvasContext.fillRect(0, 0, 100, 100);

    // circle
    canvasContext.beginPath();
    canvasContext.arc(200, 200, 50, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = "powderblue";
    canvasContext.fill();
    canvasContext.closePath();

    // line
    // canvasContext.beginPath();
    // canvasContext.moveTo(0, 0);
    // canvasContext.lineTo(0, 600);
    // canvasContext.strokeStyle = "violet";
    // canvasContext.stroke();
    // canvasContext.closePath();

    // drawing a grid
    canvasContext.beginPath();
    for (let x = 0; x <= testCanvasRef.current.width; x += 100) {
      canvasContext.moveTo(x, 0);
      canvasContext.lineTo(x, 400);
    }
    canvasContext.strokeStyle = "gray";
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.beginPath();
    for (let y = 0; y <= testCanvasRef.current.height; y += 100) {
      canvasContext.moveTo(0, y);
      canvasContext.lineTo(600, y);
    }
    canvasContext.strokeStyle = "gray";
    canvasContext.stroke();
    canvasContext.closePath();
  };

  useEffect(() => {
    if (testCanvasRef && testCanvasRef.current) {
      renderCanvas();
    }
  });

  return (
    <section className="w-full h-full p-24 flex flex-col gap-8 justify-center items-center border-4 border-black">
      <h1 className="text-2xl font-semibold text-center text-blue-500">
        Experiment Window [canvas]
      </h1>

      <canvas ref={testCanvasRef} id="test-canvas"></canvas>
    </section>
  );
};

export default ExperimentWindow;
