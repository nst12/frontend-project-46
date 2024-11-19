import path from 'node:path';

export const getFixturePath = (filename) =>
  path.join('__tests__', '__fixtures__', filename);
