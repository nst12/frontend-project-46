import { expect, test } from '@jest/globals';
import parse from '../src/parsers.js';
import { getFixturePath } from '../test-utils/utils.js';
import { getDiffTree } from '../src/index.js';
import { formatStylish } from '../src/formatters/index.js';

const flatObject = {
  follow: {
    type: 'removed',
    value: false,
  },
  host: {
    type: 'unchanged',
    value: 'hexlet.io',
  },
  proxy: {
    type: 'removed',
    value: '123.234.53.22',
  },
  timeout: {
    newValue: 20,
    oldValue: 50,
    type: 'changed',
  },
  verbose: {
    type: 'added',
    value: true,
  },
};

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

test('getDiffTree', () => {
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

  expect(getDiffTree(obj1, obj2)).toStrictEqual(flatObject);
});

test('getDiffArrayNested', () => {
  const obj1 = parse(getFixturePath('file1nested.json'));
  const obj2 = parse(getFixturePath('file2nested.json'));

  const expected = {
    common: {
      children: {
        follow: {
          type: 'added',
          value: false,
        },
        setting1: {
          type: 'unchanged',
          value: 'Value 1',
        },
        setting2: {
          type: 'removed',
          value: 200,
        },
        setting3: {
          newValue: null,
          oldValue: true,
          type: 'changed',
        },
        setting4: {
          type: 'added',
          value: 'blah blah',
        },
        setting5: {
          type: 'added',
          value: {
            key5: 'value5',
          },
        },
        setting6: {
          children: {
            doge: {
              children: {
                wow: {
                  newValue: 'so much',
                  oldValue: '',
                  type: 'changed',
                },
              },
              type: 'nested',
            },
            key: {
              type: 'unchanged',
              value: 'value',
            },
            ops: {
              type: 'added',
              value: 'vops',
            },
          },
          type: 'nested',
        },
      },
      type: 'nested',
    },
    group1: {
      children: {
        baz: {
          newValue: 'bars',
          oldValue: 'bas',
          type: 'changed',
        },
        foo: {
          type: 'unchanged',
          value: 'bar',
        },
        nest: {
          newValue: 'str',
          oldValue: {
            key: 'value',
          },
          type: 'changed',
        },
      },
      type: 'nested',
    },
    group2: {
      type: 'removed',
      value: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    },
    group3: {
      type: 'added',
      value: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    },
  };
  expect(getDiffTree(obj1, obj2)).toStrictEqual(expected);
});

test('format', () => {
  const expected = parse(getFixturePath('formatResult.txt'));

  expect(formatStylish(flatObject)).toEqual(expected);
});
