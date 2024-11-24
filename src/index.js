import { parse } from './parsers.js';
import { formatJson, formatPlain, formatStylish } from './formatters/index.js';

const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);

export const getDiffTree = (obj1 = {}, obj2 = {}) => {
  const keys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].sort();

  return Object.fromEntries(
    keys.map((key) => {
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return [
          key,
          {
            type: 'nested',
            children: getDiffTree(obj1[key], obj2[key]),
          },
        ];
      }
      if (!(key in obj2)) {
        return [key, { type: 'removed', value: obj1[key] }];
      }
      if (!(key in obj1)) {
        return [key, { type: 'added', value: obj2[key] }];
      }
      if (obj1[key] !== obj2[key]) {
        return [
          key,
          { type: 'changed', oldValue: obj1[key], newValue: obj2[key] },
        ];
      }
      return [key, { type: 'unchanged', value: obj1[key] }];
    }),
  );
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

export default getDiff;
