import fs from 'fs';
import yaml from 'js-yaml';
import path from "node:path";

const parse = (filepath) => {
  const extension = path.extname(filepath).slice(1);
  const text = fs.readFileSync(filepath, 'utf8');
  if (extension === 'json') {
    return JSON.parse(text);
  }
  if (extension === 'yml' || extension === 'yaml') {
    return yaml.load(text);
  }

  throw new Error(`Invalid extension - ${extension}`);
};

export default parse;
