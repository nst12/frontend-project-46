import { parse } from '../src/parsers.js';
import { expect, test } from '@jest/globals';
import { getDiff } from '../src/index.js';
import { getFixturePath } from '../__tests-utils__/utils.js';

const getGenDiffFixture = (filePath1, filePath2, expectedFilePath) => {
  return {
    filePath1: getFixturePath(filePath1),
    filePath2: getFixturePath(filePath2),
    expected: parse(getFixturePath(expectedFilePath)),
  };
};

test('getDiffJson', () => {
  const fixture = getGenDiffFixture(
    'file1.json',
    'file2.json',
    'formatResult.txt',
  );
  expect(getDiff(fixture.filePath1, fixture.filePath2)).toBe(fixture.expected);
});

test('getDiffYaml', () => {
  const fixture = getGenDiffFixture(
    'file1.yml',
    'file2.yml',
    'formatResult.txt',
  );
  expect(getDiff(fixture.filePath1, fixture.filePath2)).toBe(fixture.expected);
});

test('getDiffJsonNested', () => {
  const fixture = getGenDiffFixture(
    'file1nested.json',
    'file2nested.json',
    'formatResultNested.txt',
  );
  expect(getDiff(fixture.filePath1, fixture.filePath2)).toBe(fixture.expected);
});

test('getDiffYamlNested', () => {
  const fixture = getGenDiffFixture(
    'file1nested.yaml',
    'file2nested.yaml',
    'formatResultNested.txt',
  );
  expect(getDiff(fixture.filePath1, fixture.filePath2)).toBe(fixture.expected);
});

test('getDiffJsonNestedFormatPlain', () => {
  const fixture = getGenDiffFixture(
    'file1nested.json',
    'file2nested.json',
    'formatResultNestedPlain.txt',
  );
  expect(getDiff(fixture.filePath1, fixture.filePath2, 'plain')).toBe(
    fixture.expected,
  );
});

test('getDiffJsonNestedFormatJson', () => {
  const fixture = getGenDiffFixture(
    'file1nested.json',
    'file2nested.json',
    'formatResultNestedJson.txt',
  );
  expect(getDiff(fixture.filePath1, fixture.filePath2, 'json')).toBe(
    fixture.expected,
  );
});
