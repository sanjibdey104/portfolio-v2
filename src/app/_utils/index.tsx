//================= defining the types
type xRange = {
  xMin: number;
  xMax: number;
};

type yRange = {
  yMin: number;
  yMax: number;
};

//==================== utils functions start here
const generateRandomCords = (xRange: xRange, yRange: yRange) => {
  let abscissa = Math.floor(
    Math.random() * (xRange.xMax - xRange.xMin) + xRange.xMin
  );
  let ordinate = Math.floor(
    Math.random() * (yRange.yMax - yRange.yMin) + yRange.yMin
  );
  console.log("=== {abscissa, ordinate}", { abscissa, ordinate });
  return { abscissa, ordinate };
};

// highlighter renderer
const highlightColors = [
  "rgb(189, 224, 254)",
  "rgb(204, 213, 174)",
  "rgb(255, 200, 221)",
  "rgb(252, 213, 206)",
  "rgb(128, 237, 153)",
  "rgb(216, 226, 220)",
  "rgb(255, 213, 0)",
];

export const renderTextHighlighter = () => {
  let textsToHighlight = document.querySelectorAll(".text-to-highlight");

  for (let i = 0; i < textsToHighlight.length; i++) {
    // fetching required params for text to be highlighted
    let textToHighlight = textsToHighlight[i];
    let textWidth = Math.floor(textToHighlight.getBoundingClientRect().width);
    let textHeight = Math.floor(textToHighlight.getBoundingClientRect().height);

    // generating the svg element
    let highlighterSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    highlighterSvg.setAttributeNS(null, "class", "highlighter-svg");
    highlighterSvg.setAttributeNS(null, "width", `${textWidth}`);
    highlighterSvg.setAttributeNS(null, "height", `${textHeight}`);

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

    // generate highlighter color
    let highlighterColor =
      highlightColors[Math.floor(Math.random() * highlightColors.length)];

    highlighterSvg.innerHTML = `<path class="path highlighter-svg-path" d="${moveToMetric} ${curveMetric}" stroke="${highlighterColor}" fill="transparent" stroke-width="17" stroke-linecap="square"></path>`;

    // append the generated path to the parent svg element
    textToHighlight.append(highlighterSvg);
  }
};
