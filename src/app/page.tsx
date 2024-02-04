export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="portfolio-scope-explanation w-full h-full p-8 lg:p-20">
        <h1 className="w-full lg:w-1/2 text-5xl mb-1 font-semibold">
          Hello, seeker.
        </h1>

        <h1 className="w-full lg:w-1/2 text-5xl mb-8 font-semibold">
          Welcome to my programming journal.
        </h1>

        <div className="current-research__tracker">
          <h4 className="flex items-center gap-1 mb-1">
            <span className="current-experiment-pulse-indicator"></span>
            <span>Currently exploring: SVG paths</span>
          </h4>
        </div>
      </section>
    </main>
  );
}
