### Hexlet tests and linter status:

[![Actions Status](https://github.com/nst12/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nst12/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/000dc9e2ea62cb7a830a/maintainability)](https://codeclimate.com/github/nst12/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/000dc9e2ea62cb7a830a/test_coverage)](https://codeclimate.com/github/nst12/frontend-project-46/test_coverage)

# Difference Calculator

The Difference Calculator is a program that determines the difference between two data structures. This is a common task with many online services available, such as [JSON Diff](http://www.jsondiff.com/). Similar mechanisms are used in test output or when automatically tracking changes in configuration files.

## Features

- **Supports Different Input Formats:** YAML, JSON
- **Report Generation in Various Formats:** Plain text, stylish, and JSON

## Usage Example
[demo](https://asciinema.org/a/NlYPMGGNQJHuAkRfSBiC1WeSH)

### Plain Format

```bash
gendiff --format plain path/to/file.yml another/path/file.json
```

```
Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
```

### Stylish Format

```bash
gendiff filepath1.json filepath2.json
```

```plaintext
{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

### JSON Format

```bash
gendiff --format json filepath1.json filepath2.json
```

```json
{
  "follow": {
    "type": "removed",
    "value": false
  },
  "host": {
    "type": "unchanged",
    "value": "hexlet.io"
  },
  "proxy": {
    "type": "removed",
    "value": "123.234.53.22"
  },
  "timeout": {
    "type": "changed",
    "oldValue": 50,
    "newValue": 20
  },
  "verbose": {
    "type": "added",
    "value": true
  }
}
```