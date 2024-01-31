"use client"; // This is a client component
// import { useEffect } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { renderTextHighlighter } from "./_utils";

export default function Home() {
  useEffect(() => {
    renderTextHighlighter();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <p className="experiment-text p-24">
        Lorem Ipsum is simply <span className="text-to-highlight">dummy</span>{" "}
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type{" "}
        <span className="text-to-highlight">specimen</span> book. It has
        survived not only five centuries, but also the leap into electronic{" "}
        <span className="text-to-highlight">typesetting</span>, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like{" "}
        <span className="text-to-highlight">Aldus PageMaker</span> including
        versions of Lorem Ipsum.
      </p>

      {/* <section className="center">
        <div className="w-96 h-96 bg-amber-400 rounded-full relative">
          <h3 className="w-56 text-black text-4xl font-bold">
            Namaste I'm Sanjib.
          </h3>
        </div>
      </section> */}
    </main>
  );
}
