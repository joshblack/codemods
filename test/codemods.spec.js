import fs from 'fs';
import path from 'path';
import assert from 'assert';

import jscodeshift from 'jscodeshift';
import transform from '../index';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function stats(name, quantity) {
  quantity = typeof quantity !== 'number' ? 1 : quantity;
  process.send({action: 'update', name: name, quantity: quantity});
}

describe('Transform', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');

  fs.readdirSync(fixturesDir).map((transformName) => {
    it(`should ${transformName.split('-').join(' ')}`, () => {
      const testDir = path.join(fixturesDir, transformName);
      const transform = require(path.join(testDir, 'transform.js'));

      fs.readdirSync(testDir).map((caseName) => {
        it(`should ${caseName}`, () => {
          const actualPath = path.join(testDir, 'actual.js');
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
            .readFileSync(path.join(testDir, 'expected.js'))
            .toString();

          assert.equal(trim(out), trim(expected));
        });
      });
    });
  });
});

