//================= defining the types
type xRange = {
  xMin: number;
  xMax: number;
};

type yRange = {
  yMin: number;
  yMax: number;
};

type gridCanvasGeneratorType = {
  targetParentELementId?: string;
  requiredColumnsCount?: number;
  requiredRowsCount?: number;
};

//==================== utils functions start here
export const generateRandomCords = (xRange: xRange, yRange: yRange) => {
  let abscissa = Math.floor(
    Math.random() * (xRange.xMax - xRange.xMin) + xRange.xMin
  );
  let ordinate = Math.floor(
    Math.random() * (yRange.yMax - yRange.yMin) + yRange.yMin
  );
  return { abscissa, ordinate };
};

// highlighter renderer
export const highlightColors = [
  "rgb(189, 224, 254)",
  "rgb(204, 213, 174)",
  "rgb(255, 200, 221)",
  "rgb(252, 213, 206)",
  "rgb(128, 237, 153)",
  "rgb(216, 226, 220)",
  "rgb(255, 213, 0)",
];

export const generateRandomStrokeColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b}, 0.35)`;
};

export const renderTextHighlighter = () => {
  let textsToHighlight = document.querySelectorAll(".highlighted-text");

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

// grid canvas background generator
export const generateGridCanvasBg = (
  targetParentELement: gridCanvasGeneratorType
) => {
  const {
    targetParentELementId = "",
    requiredColumnsCount = 12,
    requiredRowsCount = 6,
  } = targetParentELement;

  if (targetParentELementId) {
    let targetParentElementRef = document.querySelector(
      `#${targetParentELementId}`
    );

    if (
      targetParentElementRef &&
      // make sure selected item is an HTML element
      targetParentElementRef instanceof Element
    ) {
      // destroy existing canvas when resizing
      let existingGridCanvasEl = document.querySelector(
        `#${targetParentELementId} #grid-canvas-bg`
      );
      if (existingGridCanvasEl) {
        targetParentElementRef.removeChild(existingGridCanvasEl);
      }

      // create a new canvas element
      let gridCanvas = document.createElement("canvas");
      gridCanvas.setAttribute("id", "grid-canvas-bg");

      // set all css properties
      gridCanvas.style.position = "absolute";
      gridCanvas.style.top = "0";
      gridCanvas.style.left = "0";
      gridCanvas.style.zIndex = "-1";
      gridCanvas.style.opacity = "0.1";

      // append the canvas to the target parent
      targetParentElementRef.appendChild(gridCanvas);

      // set the grid dimensions, full width and height of parent
      let targetParentElWidth: number = targetParentElementRef.clientWidth;
      let targetParentElHeight: number = targetParentElementRef.clientHeight;

      gridCanvas.width = targetParentElWidth;
      gridCanvas.height = targetParentElHeight;

      // start generating the grid on canvas
      let gridCanvasCtx = gridCanvas.getContext("2d");
      let gridTileWidth: number = Math.floor(
        targetParentElWidth / requiredColumnsCount
      );
      let gridTileHeight: number = Math.floor(
        targetParentElWidth / requiredRowsCount
      );

      if (gridCanvasCtx) {
        // draw the grid columns
        gridCanvasCtx.beginPath();
        for (let x = 0; x <= targetParentElWidth; x += gridTileWidth) {
          gridCanvasCtx.moveTo(x, 0);
          gridCanvasCtx.lineTo(x, targetParentElHeight);
        }
        gridCanvasCtx.strokeStyle = "gray";
        gridCanvasCtx.stroke();
        gridCanvasCtx.closePath();

        // draw the grid rows
        gridCanvasCtx.beginPath();
        for (let y = 0; y <= targetParentElHeight; y += gridTileHeight) {
          gridCanvasCtx.moveTo(0, y);
          gridCanvasCtx.lineTo(targetParentElWidth, y);
        }
        gridCanvasCtx.strokeStyle = "gray";
        gridCanvasCtx.stroke();
        gridCanvasCtx.closePath();
      }
    } else {
      console.error(
        "[GRID GENERATION FAILED]: Please provide valid target parent element class"
      );
    }
  } else {
    console.error(
      "[GRID GENERATION FAILED]: Please provide target parent element class"
    );
  }
};
