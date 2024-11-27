import parse from './parsers.js';
import { formatJson, formatPlain, formatStylish } from './formatters/index.js';
import makeAstTree from "./makeAstTree.js";

const getDiff = (file1, file2, format = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);

  const diffTree = makeAstTree(obj1, obj2);

  if (format === 'stylish') {
    return formatStylish(diffTree);
  }
  if (format === 'plain') {
    return formatPlain(diffTree);
  }
  if (format === 'json') {
    return formatJson(diffTree);
  }

  return diffTree;
};

export default getDiff;
