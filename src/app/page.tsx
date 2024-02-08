"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const renderGridCanvasBg = () => {
    let gridCanvasRef =
      document.querySelector<HTMLCanvasElement>(".bg-grid-canvas");

    if (gridCanvasRef) {
      gridCanvasRef.width = window.innerWidth;
      gridCanvasRef.height = window.innerHeight;

      let gridCanvasCtx = gridCanvasRef.getContext("2d");

      if (gridCanvasCtx) {
        gridCanvasCtx.beginPath();
        for (let x = 0; x <= window.innerWidth; x += 100) {
          gridCanvasCtx.moveTo(x, 0);
          gridCanvasCtx.lineTo(x, window.innerHeight);
        }
        gridCanvasCtx.strokeStyle = "gray";
        gridCanvasCtx.stroke();
        gridCanvasCtx.closePath();

        gridCanvasCtx.beginPath();
        for (let y = 0; y <= window.innerHeight; y += 100) {
          gridCanvasCtx.moveTo(0, y);
          gridCanvasCtx.lineTo(window.innerWidth, y);
        }
        gridCanvasCtx.strokeStyle = "gray";
        gridCanvasCtx.stroke();
        gridCanvasCtx.closePath();
      }
    }
  };

  useEffect(() => {
    renderGridCanvasBg();

    window.addEventListener("resize", () => {
      renderGridCanvasBg();
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <canvas
        id="bg-canvas-grid"
        className="bg-grid-canvas w-full h-full -z-10 opacity-5 absolute top-0 right-0 left-0 bottom-0"
      ></canvas>

      <section className="portfolio-scope-explanation w-full h-full p-8 lg:p-20 bg-transparent">
        <h1 className="w-full lg:w-1/2 text-4xl lg:text-5xl mb-1 font-semibold">
          Hello, seeker.
        </h1>

        <h1 className="w-full lg:w-1/2 text-4xl lg:text-5xl mb-8 font-semibold">
          Welcome to my creative coding journal.
        </h1>

        <div className="current-research__tracker">
          <h4 className="flex items-center gap-1 mb-1">
            <span className="current-experiment-pulse-indicator"></span>
            <span>Currently exploring: HTML Canvas</span>
          </h4>
        </div>
      </section>
    </main>
  );
}
