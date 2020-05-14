const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const PADDING = 0.05;

export const generateSvg = (width, height, geometry) => {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");

  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  const polygon = document.createElementNS(SVG_NAMESPACE, "polygon");
  const points = getPoints(width, height, geometry.coordinates[0]);

  polygon.setAttribute("points", points);
  polygon.setAttribute("fill", "#95B3D7");
  polygon.setAttribute("stroke-width", 1);
  polygon.setAttribute("stroke", "#707070");

  svg.appendChild(polygon);

  return svg;
};

const getPoints = (width, height, points) => {
  const boundingRect = getBoundingRect(points);
  const widthDifference = boundingRect.right - boundingRect.left;
  const heightDifference = boundingRect.top - boundingRect.bottom;

  const ratio = widthDifference / heightDifference;
  const svgRatio = width / height;

  let scaledHeight, scaledWidth;

  if (svgRatio > ratio) {
    scaledWidth = (widthDifference / ratio) * svgRatio;
    scaledHeight = heightDifference;
  } else {
    scaledWidth = widthDifference;
    scaledHeight = (heightDifference * ratio) / svgRatio;
  }

  const xScaler = scaleCoordinate(
    -(scaledWidth / 2 - widthDifference / 2),
    scaledWidth,
    width
  );
  const yScaler = scaleCoordinate(
    scaledHeight / 2 - heightDifference / 2,
    -scaledHeight,
    height
  );

  return points.map((point) => [
    xScaler(point[0] - boundingRect.left),
    yScaler(point[1] - boundingRect.top)
  ]);
};

const scaleCoordinate = (min, difference, absoluteMax) => (coordinate) => {
  return ((coordinate - min) / difference) * absoluteMax;
};

const getBoundingRect = (points) => {
  const initialBoundingRect = {
    top: Number.NEGATIVE_INFINITY,
    left: Number.POSITIVE_INFINITY,
    right: Number.NEGATIVE_INFINITY,
    bottom: Number.POSITIVE_INFINITY
  };

  return points.reduce(
    (acc, curr) => ({
      left: Math.min(curr[0], acc.left),
      top: Math.max(curr[1], acc.top),
      right: Math.max(curr[0], acc.right),
      bottom: Math.min(curr[1], acc.bottom)
    }),
    initialBoundingRect
  );
};
