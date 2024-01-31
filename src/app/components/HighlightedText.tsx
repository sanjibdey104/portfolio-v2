"use client"; // This is a client component
import { useEffect, useRef, useState } from "react";
import { generateRandomCords, highlightColors } from "@/app/_utils";

const HighlightedText = (props: any) => {
  let highlightedTextRef = useRef<any>(null);
  const [randomGeneratedPath, setRandomGeneratePath] = useState("");
  const [svgMetrics, setSvgMetrics] = useState<{
    width: number;
    height: number;
  }>({ width: 60, height: 16 });

  useEffect(() => {
    if (highlightedTextRef && highlightedTextRef.current) {
      let textToHighlight = highlightedTextRef.current;

      // fetching required params for text to be highlighted
      let textWidth = Math.floor(textToHighlight.getBoundingClientRect().width);
      let textHeight = Math.floor(
        textToHighlight.getBoundingClientRect().height
      );

      setSvgMetrics({ ...svgMetrics, width: textWidth, height: textHeight });

      // generating the curve path
      let startCords = generateRandomCords(
        { xMax: 10, xMin: 5 },
        { yMax: 10, yMin: 5 }
      );

      let endCords = generateRandomCords(
        { xMax: textWidth, xMin: textWidth - 10 },
        { yMax: textHeight, yMin: 5 }
      );

      let firstControlCords = generateRandomCords(
        { xMax: 30, xMin: 10 },
        { yMax: 12, yMin: 5 }
      );

      let secondControlCords = generateRandomCords(
        { xMax: 10, xMin: -18 },
        { yMax: 5, yMin: -5 }
      );

      let moveToMetric = `M ${startCords.abscissa} ${startCords.ordinate}`;
      let curveMetric = `C ${firstControlCords.abscissa} ${firstControlCords.ordinate} ${secondControlCords.abscissa} ${secondControlCords.ordinate} ${endCords.abscissa} ${endCords.ordinate}`;

      setRandomGeneratePath(`${moveToMetric} ${curveMetric}`);
    }
  }, []);

  return (
    <span ref={highlightedTextRef} className="highlighted-text relative">
      {props.children}

      <svg
        width={svgMetrics.width}
        height={svgMetrics.height}
        className="highlighter-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="path highlighter-svg-path"
          d={randomGeneratedPath}
          stroke={
            highlightColors[Math.floor(Math.random() * highlightColors.length)]
          }
          fill="transparent"
          stroke-width="17"
          stroke-linecap="square"
        ></path>
      </svg>
    </span>
  );
};

export default HighlightedText;
