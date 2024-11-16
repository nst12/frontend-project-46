import {parse} from "./parser.js";

const getDiff = (file1, file2) => {
  parse(file1);
  parse(file2);
}

export {
  getDiff
}