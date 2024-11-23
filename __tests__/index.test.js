import { parse } from '../src/parsers.js';
import { expect, test } from '@jest/globals';
import { getDiff } from '../src/index.js';
import { getFixturePath } from '../__tests-utils__/utils.js';

test('getDiffJson', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = parse(getFixturePath('formatResult.txt'));

  expect(getDiff(file1, file2)).toBe(expected);
});

test('getDiffYaml', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = parse(getFixturePath('formatResult.txt'));

  expect(getDiff(file1, file2)).toBe(expected);
});

test('getDiffJsonNested', () => {
  const file1 = getFixturePath('file1nested.json');
  const file2 = getFixturePath('file2nested.json');
  const expected = parse(getFixturePath('formatResultNested.txt'));

  expect(getDiff(file1, file2)).toBe(expected);
});

test('getDiffYamlNested', () => {
  const file1 = getFixturePath('file1nested.yaml');
  const file2 = getFixturePath('file2nested.yaml');
  const expected = parse(getFixturePath('formatResultNested.txt'));

  expect(getDiff(file1, file2)).toBe(expected);
});

test('getDiffJsonNestedFormatPlain', () => {
  const file1 = getFixturePath('file1nested.json');
  const file2 = getFixturePath('file2nested.json');
  const expected = parse(getFixturePath('formatResultNestedPlain.txt'));

  expect(getDiff(file1, file2, 'plain')).toBe(expected);
});

test('getDiffJsonNestedFormatJson', () => {
  const file1 = getFixturePath('file1nested.json');
  const file2 = getFixturePath('file2nested.json');
  const expected = parse(getFixturePath('formatResultNestedJson.txt'));

  expect(getDiff(file1, file2, 'json')).toBe(expected);
});
