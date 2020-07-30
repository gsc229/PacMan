import { width } from "./gameBoard.js"

export const getCoodinates = (index) => {
  return [index % width, Math.floor(index/width)]
}
