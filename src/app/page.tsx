"use client";

import Link from "next/link";
import { useEffect } from "react";
import { generateGridCanvasBg } from "./_utils";

export default function Home() {
  useEffect(() => {
    generateGridCanvasBg({
      targetParentELementId: "homepage",
    });

    window.addEventListener("resize", () => {
      generateGridCanvasBg({ targetParentELementId: "homepage" });
    });
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      id="homepage"
    >
      <section className="portfolio-scope-explanation w-full h-full flex flex-col items-start justify-center p-8 lg:p-20 bg-transparent">
        <h1 className="w-full lg:w-1/2 text-4xl lg:text-5xl mb-1 font-semibold">
          Hello, seeker.
        </h1>

        <h1 className="w-full lg:w-1/2 text-4xl lg:text-5xl mb-8 font-semibold">
          Welcome to my creative coding journal.
        </h1>

        <div className="current-research__tracker">
          <h4 className="flex items-center gap-1 mb-1">
            <span className="current-experiment-pulse-indicator"></span>
            <span>
              Currently exploring:{" "}
              <Link
                href="/experiments/poppingPoints"
                className="current-experiment-page-link text-cyan-700 hover:text-cyan-500 transition-colors duration-150"
              >
                HTML Canvas
              </Link>{" "}
            </span>
          </h4>
        </div>
      </section>
    </main>
  );
}
