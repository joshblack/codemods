import fs from 'fs';
import path from 'path';
import assert from 'assert';

import jscodeshift from 'jscodeshift';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function stats(name, quantity) {
  quantity = typeof quantity !== 'number' ? 1 : quantity;
  process.send({action: 'update', name: name, quantity: quantity});
}

describe('Transforms', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');

  fs.readdirSync(fixturesDir)
    .map((transformName) => {
      describe(`${transformName.split('-').join(' ')}`, () => {
        const testDir = path.join(fixturesDir, transformName);
        const transform = require(path.join(testDir, 'transform.js'));

        fs.readdirSync(testDir)
          .filter((name) => name !== 'transform.js')
          .map((caseName) => {
            it(`should ${caseName.split('-').join(' ')}`, () => {
              const actualPath = path.join(testDir, caseName, 'actual.js');
              const actual = fs.readFileSync(actualPath).toString();

              const out = transform(
                {
                  path: actualPath,
                  source: actual
                },
                {
                  jscodeshift,
                  stats
                }
              );

              const expected = fs
                .readFileSync(path.join(testDir, caseName, 'expected.js'))
                .toString();

              assert.equal(trim(out), trim(expected));
            });
          });
        });
    });
});

