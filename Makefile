install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint src

test:
	npx jest __tests__

coverage:
	npx jest __tests__ --coverage
