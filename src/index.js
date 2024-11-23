import { parse } from './parsers.js';
import { formatJson, formatPlain, formatStylish } from './formatters/index.js';

const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);

export const getDiffTree = (obj1 = {}, obj2 = {}) => {
  const keys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].sort();

  return keys.reduce((acc, key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      acc[key] = {
        type: 'nested',
        children: getDiffTree(obj1[key], obj2[key]),
      };
    } else if (!(key in obj2)) {
      acc[key] = { type: 'removed', value: obj1[key] };
    } else if (!(key in obj1)) {
      acc[key] = { type: 'added', value: obj2[key] };
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = { type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    } else {
      acc[key] = { type: 'unchanged', value: obj1[key] };
    }
    return acc;
  }, {});
};

const getDiff = (file1, file2, format = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);

  const diffTree = getDiffTree(obj1, obj2);

  if (format === 'stylish') {
    return formatStylish(diffTree);
  } else if (format === 'plain') {
    return formatPlain(diffTree);
  } else if (format === 'json') {
    return formatJson(diffTree);
  }
};

export { getDiff };
