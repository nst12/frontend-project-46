#!/usr/bin/env node
import { Command } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish');

program.arguments('<file1> <file2>').action((file1, file2, options) => {
  console.log(getDiff(file1, file2, options.format));
});

program.parse();
