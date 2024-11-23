import { parse } from './parsers.js';

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

const formatValue = (value, depth) => {
  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  if (typeof value !== 'object' || value === null) {
    // Примитивное значение, возвращаем как есть
    return `${value}`;
  } else {
    // Это объект, рекурсивно форматируем его
    const entries = Object.entries(value).map(
      ([key, val]) => `${currentIndent}${key}: ${formatValue(val, depth + 1)}`,
    );
    return `{\n${entries.join('\n')}\n${bracketIndent}}`;
  }
};

export const formatDiff = (diffTree, depth = 1) => {
  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize - 2);

  const formatted = Object.entries(diffTree).map(([key, node]) => {
    const { type } = node;

    switch (type) {
      case 'nested':
        return `${currentIndent}  ${key}: {\n${formatDiff(node.children, depth + 1)}\n${currentIndent}  }`;

      case 'added':
        return `${currentIndent}+ ${key}: ${formatValue(node.value, depth + 1)}`;

      case 'removed':
        return `${currentIndent}- ${key}: ${formatValue(node.value, depth + 1)}`;

      case 'changed':
        return `${currentIndent}- ${key}: ${formatValue(node.oldValue, depth + 1)}\n${currentIndent}+ ${key}: ${formatValue(node.newValue, depth + 1)}`;

      case 'unchanged':
        return `${currentIndent}  ${key}: ${formatValue(node.value, depth + 1)}`;

      default:
        return '';
    }
  });

  return depth === 1 ? `{\n${formatted.join('\n')}\n}` : formatted.join('\n');
};

const getDiff = (file1, file2, format = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);

  const diffArray = getDiffTree(obj1, obj2);

  let result = '';

  if (format === 'stylish') {
    result = formatDiff(diffArray);
  }

  console.log(result);
  return result;
};

export { getDiff };
