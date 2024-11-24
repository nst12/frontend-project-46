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

const runTest = (description, file1, file2, expected, format) => {
  test(description, () => {
    const fixture = getGenDiffFixture(file1, file2, expected);
    expect(getDiff(fixture.filePath1, fixture.filePath2, format)).toBe(
      fixture.expected,
    );
  });
};

runTest('getDiffJson', 'file1.json', 'file2.json', 'formatResult.txt');
runTest('getDiffYaml', 'file1.yml', 'file2.yml', 'formatResult.txt');
runTest(
  'getDiffJsonNested',
  'file1nested.json',
  'file2nested.json',
  'formatResultNested.txt',
);
runTest(
  'getDiffYamlNested',
  'file1nested.yaml',
  'file2nested.yaml',
  'formatResultNested.txt',
);
runTest(
  'getDiffJsonNestedFormatPlain',
  'file1nested.json',
  'file2nested.json',
  'formatResultNestedPlain.txt',
  'plain',
);
runTest(
  'getDiffJsonNestedFormatJson',
  'file1nested.json',
  'file2nested.json',
  'formatResultNestedJson.txt',
  'json',
);
