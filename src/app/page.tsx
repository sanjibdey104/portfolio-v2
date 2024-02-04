"use client";
import HighlightedText from "./components/HighlightedText";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="portfolio-scope-explanation w-full h-full p-20">
        <h1 className="w-full lg:w-1/3 text-6xl mb-8 font-semibold">
          presenting <HighlightedText>version 2</HighlightedText> of my
          portfolio
        </h1>

        <div className="explanation w-full lg:w-1/2 mb-8">
          <p>
            the idea is to{" "}
            <HighlightedText>explore and implement</HighlightedText>{" "}
            fundamentals, different tools and technologies, and maintain the
            portfolio as a journal.
          </p>
          <p>tracking everything from findings to failures.</p>
        </div>

        <div className="current-research__tracker">
          <h4 className="flex items-center gap-1 mb-1">
            <span className="current-experiment-pulse-indicator"></span>
            <span>currently experimenting</span>
          </h4>

          <p className="current-research__domain mb-1">
            [domain]: creative coding{" "}
          </p>

          <p className="current-research__topic mb-1">
            [topic]: SVGs (specifically curves){" "}
          </p>

          <p className="current-research-topic__brief">
            [brief]: generating custom highlighter SVG for specific texts
          </p>
        </div>
      </section>
    </main>
  );
}
