import fs from "fs";
import path from 'node:path';
import { expect, test } from '@jest/globals';
import getDiff from '../src/index.js';

/* eslint-disable jest/no-export */
export const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

/* eslint-disable jest/no-export */
export const runTest = (description, file1, file2, expected, format) => {
  /* eslint-disable jest/valid-title */
  test(String(description), () => {
    const fixture = {
      filePath1: getFixturePath(file1),
      filePath2: getFixturePath(file2),
      expected: fs.readFileSync(getFixturePath(expected), 'utf8'),
    };
    expect(getDiff(fixture.filePath1, fixture.filePath2, format)).toBe(
      fixture.expected,
    );
  });
};
