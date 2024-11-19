import { parse } from './parsers.js';

export const getDiffArray = (obj1, obj2) => {
  const keys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].sort();

  return keys
    .map((key) => {
      if (obj1[key] === obj2[key]) {
        return `  ${key}: ${obj1[key]}`;
      } else if (obj2[key] === undefined) {
        return `- ${key}: ${obj1[key]}`;
      } else if (obj1[key] === undefined) {
        return `+ ${key}: ${obj2[key]}`;
      } else {
        return [`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`];
      }
    })
    .flat();
};

export const formatDiff = (diffs) => `{\n  ${diffs.join('\n  ')}\n}`;

const getDiff = (file1, file2) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);

  const diffArray = getDiffArray(obj1, obj2);

  const result = formatDiff(diffArray);
  console.log(result);
  return result;
};

export { getDiff };
