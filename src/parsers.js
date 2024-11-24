import fs from 'fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const extension = filepath.slice(filepath.lastIndexOf('.') + 1);
  const text = fs.readFileSync(filepath, 'utf8');
  if (extension === 'json') {
    return JSON.parse(text);
  }
  if (extension === 'yml' || extension === 'yaml') {
    return yaml.load(text);
  }

  return text;
};

export default parse;
