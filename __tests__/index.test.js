import { runTest } from '../test-utils/utils.js';

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
