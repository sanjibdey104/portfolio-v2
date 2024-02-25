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

interface IGridAxisCoordsCalculator {
  targetParentElWidth: number;
  targetParentElHeight: number;
  requiredColumnsCount: number;
  requiredRowsCount: number;
}

interface ICoord {
  xCord: number;
  yCord: number;
}

interface ICordObj {
  [key: string]: {
    xCord: number;
    yCord: number;
  };
}

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
    requiredColumnsCount = 8,
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
      gridCanvas.style.opacity = "0.2";

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
        targetParentElHeight / requiredRowsCount
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

        let allGridCoords = calcGridAxisCoordinates({
          targetParentElWidth,
          targetParentElHeight,
          requiredColumnsCount,
          requiredRowsCount,
        });

        if (allGridCoords && allGridCoords.length) {
          let { sparsedCoords = [], originRandomGridCord } =
            calcSparseRandomCoords(
              allGridCoords,
              gridTileWidth,
              gridTileHeight
            );

          sparsedCoords.forEach((sparsedCoord) => {
            if (gridCanvasCtx) {
              gridCanvasCtx.beginPath();
              gridCanvasCtx.fillStyle =
                originRandomGridCord &&
                sparsedCoord.xCord === originRandomGridCord.xCord &&
                sparsedCoord.yCord === originRandomGridCord.yCord
                  ? "#FF0000"
                  : "#000000";
              gridCanvasCtx.arc(
                sparsedCoord.xCord,
                sparsedCoord.yCord,
                20,
                0,
                2 * Math.PI
              );
              gridCanvasCtx.fill();
            }
          });
        }
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

// fetch grid axis coordinates
export const calcGridAxisCoordinates = (
  gridCalcMetrics: IGridAxisCoordsCalculator
) => {
  let {
    targetParentElWidth,
    targetParentElHeight,
    requiredColumnsCount,
    requiredRowsCount,
  } = gridCalcMetrics;

  let ordinates: Array<number> = [];
  let abscissas: Array<number> = [];
  let gridCoords: Array<{ xCord: number; yCord: number }> = [];
  let gridCoordsObj: ICordObj = {};

  let gridTileWidth: number = Math.floor(
    targetParentElWidth / requiredColumnsCount
  );
  let gridTileHeight: number = Math.floor(
    targetParentElHeight / requiredRowsCount
  );

  for (let x = 0; x <= targetParentElWidth; x += gridTileWidth) {
    ordinates.push(x);
  }

  for (let y = 0; y <= targetParentElHeight; y += gridTileHeight) {
    abscissas.push(y);
  }

  for (let xCordIdx = 0; xCordIdx < ordinates.length; xCordIdx++) {
    for (let yCordIdx = 0; yCordIdx < abscissas.length; yCordIdx++) {
      gridCoords.push({
        xCord: ordinates[xCordIdx],
        yCord: abscissas[yCordIdx],
      });

      // gridCoordsObj[`coord_${xCordIdx}_${yCordIdx}`] = {
      //   xCord: ordinates[xCordIdx],
      //   yCord: abscissas[yCordIdx],
      // };
    }
  }

  return gridCoords;
};

// pick random coords
export const pickRandomCoords = (
  coordsArr: Array<ICoord>
  // coordsObj: ICordObj
) => {
  let randomCoordsArr: Array<ICoord> = [];
  let requiredRandomCoordsCount = 25;

  for (
    let randomCordCount = 0;
    randomCordCount < requiredRandomCoordsCount;
    randomCordCount++
  ) {
    let randomCord = coordsArr[Math.floor(Math.random() * coordsArr.length)];
    let isCordAlreadyExists = randomCoordsArr.some(
      (cord) =>
        cord.xCord === randomCord.xCord && cord.yCord === randomCord.yCord
    );

    if (!isCordAlreadyExists) {
      randomCoordsArr.push(randomCord);
    } else {
      randomCordCount = randomCordCount - 1;
    }
  }
  return randomCoordsArr;
};

// calculate distance between two coordinates
export const calcDistanceBetweenCoords = (
  coordOne: ICoord,
  coordTwo: ICoord
) => {
  return Math.floor(
    Math.sqrt(
      (coordOne.xCord - coordTwo.xCord) ** 2 +
        (coordOne.yCord - coordTwo.yCord) ** 2
    )
  );
};

// calculate unique and well-spaced/sparsed coordinates
export const calcSparseRandomCoords = (
  allGridCoords: Array<ICoord> = [],
  gridTileWidth: number,
  gridTileHeight: number
) => {
  let sparsedCoords: Array<ICoord> = [];
  let originRandomGridCord: ICoord | null = null;

  if (allGridCoords && allGridCoords.length) {
    originRandomGridCord =
      allGridCoords[Math.floor(Math.random() * allGridCoords.length)];

    sparsedCoords.push(originRandomGridCord);

    let biggerCord =
      gridTileWidth > gridTileHeight ? gridTileWidth : gridTileHeight;

    let comparableGridCoords = allGridCoords.filter(
      (gridCord) =>
        gridCord.xCord !== originRandomGridCord?.xCord ||
        gridCord.yCord !== originRandomGridCord?.yCord
    );

    comparableGridCoords.forEach((gridCord) => {
      let isValidDistantCoord = sparsedCoords.every((sparsedCoord) => {
        let distanceBetweenCoords = calcDistanceBetweenCoords(
          sparsedCoord,
          gridCord
        );
        return Boolean(distanceBetweenCoords > biggerCord);
      });

      if (isValidDistantCoord) {
        sparsedCoords.push(gridCord);
      } else return;
    });
  }
  return { sparsedCoords, originRandomGridCord };
};
