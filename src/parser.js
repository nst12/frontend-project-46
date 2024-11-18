import * as fs from 'fs';

export const parse = (filepath) => {
  const extension = filepath.slice(filepath.lastIndexOf('.') + 1);
  const text = fs.readFileSync(filepath, 'utf8');
  if (extension === 'json') {
    return JSON.parse(text);
  }
};

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
