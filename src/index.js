import { formatDiff, getDiffArray, parse } from './parser.js';

const getDiff = (file1, file2) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);

  const diffArray = getDiffArray(obj1, obj2);

  const result = formatDiff(diffArray);
  console.log(result);
  return result;
};

export { getDiff };
