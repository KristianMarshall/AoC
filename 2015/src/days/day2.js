import fs from "fs";

const input = fs.readFileSync("./day2Input.txt", "utf8");

function getBoxDimensions(box) {
  return box.split("x").map((dim) => parseInt(dim));
}

function calculatePaper(box) {
  const [length, width, height] = getBoxDimensions(box);

  const side1 = length * width;
  const side2 = width * height;
  const side3 = length * height;

  const smallestSize = Math.min(side1, side2, side3);

  return 2 * side1 + 2 * side2 + 2 * side3 + smallestSize;
}

function calculateRibbon(box) {
  const [length, width, height] = getBoxDimensions(box);

  const side1 = (length + width) * 2;
  const side2 = (width + height) * 2;
  const side3 = (length + height) * 2;

  const volume = length * width * height;

  const smallestSize = Math.min(side1, side2, side3);

  return smallestSize + volume;
}

function calculateTotalPaper() {
  const boxes = input.split("\n");
  return boxes.reduce((acc, box) => acc + calculatePaper(box), 0);
}

function calculateTotalRibbon() {
  const boxes = input.split("\n");
  return boxes.reduce((acc, box) => acc + calculateRibbon(box), 0);
}

console.log("Part One: ", calculateTotalPaper());

console.log("Part Two: ", calculateTotalRibbon());
