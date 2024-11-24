const formatValuePlain = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const formatPlain = (diffTree, parentPath = '') => {
  const lines = Object.entries(diffTree).flatMap(([key, node]) => {
    const propertyPath = parentPath ? `${parentPath}.${key}` : key;
    const { type } = node;

    switch (type) {
      case 'nested':
        return formatPlain(node.children, propertyPath);

      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValuePlain(node.value)}`;

      case 'removed':
        return `Property '${propertyPath}' was removed`;

      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValuePlain(node.oldValue)} to ${formatValuePlain(node.newValue)}`;

      case 'unchanged':
        return []; // Ничего не добавляем для неизменённых свойств

      default:
        return '';
    }
  });

  return lines.join('\n');
};

export default formatPlain;
