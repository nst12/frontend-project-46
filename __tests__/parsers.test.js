import { parse } from '../src/parsers.js';
import { expect, test } from '@jest/globals';
import { getFixturePath } from '../__tests-utils__/utils.js';
import { formatDiff, getDiffArray } from '../src/index.js';

test('parse', () => {
  expect(parse(getFixturePath('file1.json'))).toStrictEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });

  expect(parse(getFixturePath('file1.yml'))).toStrictEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });

  expect(parse(getFixturePath('file1.yaml'))).toStrictEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('getDiffArray', () => {
  const obj1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const obj2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  expect(getDiffArray(obj1, obj2)).toStrictEqual([
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
  ]);
});

test('format', () => {
  const expected = parse(getFixturePath('formatResult.txt'));

  expect(
    formatDiff([
      '- follow: false',
      '  host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
      '+ timeout: 20',
      '+ verbose: true',
    ]),
  ).toEqual(expected);
});
