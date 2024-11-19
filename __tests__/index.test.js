import { parse } from '../src/parser.js';
import { expect, test } from '@jest/globals';
import { getDiff } from '../src/index.js';
import { getFixturePath } from '../__tests-utils__/utils.js';

test('getDiff', () => {
  const file1JsonPath = getFixturePath('file1.json');
  const file2JsonPath = getFixturePath('file2.json');
  const expected = parse(getFixturePath('formatResult.txt'));

  expect(getDiff(file1JsonPath, file2JsonPath)).toBe(expected);
});
