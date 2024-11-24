const formatValueStylish = (value, depth) => {
  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat((depth - 1) * indentSize);

  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }

  const entries = Object.entries(value).map(([key, val]) => `${currentIndent}${key}: ${formatValueStylish(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${bracketIndent}}`;
};

const formatStylish = (diffTree, depth = 1) => {
  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize - 2);

  const formatted = Object.entries(diffTree).map(([key, node]) => {
    const { type } = node;

    switch (type) {
      case 'nested':
        return `${currentIndent}  ${key}: {\n${formatStylish(node.children, depth + 1)}\n${currentIndent}  }`;

      case 'added':
        return `${currentIndent}+ ${key}: ${formatValueStylish(node.value, depth + 1)}`;

      case 'removed':
        return `${currentIndent}- ${key}: ${formatValueStylish(node.value, depth + 1)}`;

      case 'changed':
        return `${currentIndent}- ${key}: ${formatValueStylish(node.oldValue, depth + 1)}\n${currentIndent}+ ${key}: ${formatValueStylish(node.newValue, depth + 1)}`;

      case 'unchanged':
        return `${currentIndent}  ${key}: ${formatValueStylish(node.value, depth + 1)}`;

      default:
        return '';
    }
  });

  return depth === 1 ? `{\n${formatted.join('\n')}\n}` : formatted.join('\n');
};

export default formatStylish;
