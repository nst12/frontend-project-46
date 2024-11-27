import _ from "lodash";

const makeAstTree = (obj1 = {}, obj2 = {}) => {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]);

  return Object.fromEntries(
    keys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return [
          key,
          {
            type: 'nested',
            children: makeAstTree(obj1[key], obj2[key]),
          },
        ];
      }
      if (!(key in obj2)) {
        return [key, {type: 'removed', value: obj1[key]}];
      }
      if (!(key in obj1)) {
        return [key, {type: 'added', value: obj2[key]}];
      }
      if (obj1[key] !== obj2[key]) {
        return [
          key,
          {type: 'changed', oldValue: obj1[key], newValue: obj2[key]},
        ];
      }
      return [key, {type: 'unchanged', value: obj1[key]}];
    }),
  );
};

export default makeAstTree;