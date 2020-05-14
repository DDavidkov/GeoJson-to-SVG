import geometry from "./bg-geometry.json";
import { generateSvg } from "./generate-svg";

import "./css/style.css";

const WIDTH = 1000;
const HEIGHT = 200;

const svg = generateSvg(WIDTH, HEIGHT, geometry);
const container = document.querySelector(".container");

container.appendChild(svg);
