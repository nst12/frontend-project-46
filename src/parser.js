import * as fs from 'fs';

export const parse = (filepath) => {
  const extension = filepath.slice(filepath.lastIndexOf('.') + 1)
  const text = fs.readFileSync(filepath, "utf8")

  console.log(extension)
  console.log(text)
}

