const { assert } = require('chai');
const fieldmask = require('../lib/fieldmask');

describe('fieldmask', () => {
  describe('applyFieldMask', () => {
    it('happy path', () => {
      const result = fieldmask.applyFieldMask(
        {
          f: {
            a: 22,
            b: {
              d: 1,
              x: 2,
            },
            y: 13,
          },
          z: 8,
        },
        ['f.a', 'f.b.d']
      );

      assert.deepEqual(result, {
        f: {
          a: 22,
          b: {
            d: 1,
          },
        },
      });
    });
  });

  it('null property', () => {
    const result = fieldmask.applyFieldMask(
      {
        f: {
          a: null,
          b: {
            d: 1,
            x: 2,
          },
        },
      },
      ['f.a', 'f.b.d']
    );

    assert.deepEqual(result, {
      f: {
        a: null,
        b: {
          d: 1,
        },
      },
    });
  });

  it('undefined property', () => {
    const result = fieldmask.applyFieldMask(
      {
        f: {
          a: undefined,
          b: {
            d: 1,
            x: 2,
          },
        },
      },
      ['f.a', 'f.b.d']
    );

    assert.deepEqual(result, {
      f: {
        a: undefined,
        b: {
          d: 1,
        },
      },
    });
  });

  it('array property', () => {
    const result = fieldmask.applyFieldMask(
      {
        f: {
          a: ['a', 'b'],
          b: {
            d: 1,
            x: 2,
          },
        },
      },
      ['f.a', 'f.b.d']
    );

    assert.deepEqual(result, {
      f: {
        a: ['a', 'b'],
        b: {
          d: 1,
        },
      },
    });
  });

  it('empty object', () => {
    const result = fieldmask.applyFieldMask({}, ['f.a', 'f.b.d']);

    assert.deepEqual(result, {
      f: {
        a: undefined,
        b: {
          d: undefined,
        },
      },
    });
  });
  it('null', () => {
    const result = fieldmask.applyFieldMask(null, ['f.a', 'f.b.d']);

    assert.deepEqual(result, null);
  });

  it('undefined', () => {
    const result = fieldmask.applyFieldMask(undefined, ['f.a', 'f.b.d']);

    assert.deepEqual(result, undefined);
  });

  it('number', () => {
    const result = fieldmask.applyFieldMask(1, ['f.a', 'f.b.d']);

    assert.deepEqual(result, 1);
  });

  it('escaped property name', () => {
    const result = fieldmask.applyFieldMask(
      {
        f: {
          a: 22,
          'b.z': {
            d: 1,
            x: 2,
          },
          'b.': {
            d: 1,
            x: 2,
          },
          'b\\b1': {
            d: 1,
            x: 2,
          },
          b: {
            z: {
              d: 1,
              x: 2,
            },
          },
        },
      },
      ['f.b\\.z.d', 'f.b.z.x', 'f.b\\..x', 'f.b\\\\b1.d']
    );

    assert.deepEqual(result, {
      f: {
        'b.z': {
          d: 1,
        },
        'b.': {
          x: 2,
        },
        'b\\b1': {
          d: 1,
        },
        b: {
          z: {
            x: 2,
          },
        },
      },
    });
  });
});

describe('generateFieldMask', () => {
  it('happy path', () => {
    const mask = fieldmask.generateFieldMask({
      f: {
        a: 22,
        b: {
          d: 1,
        },
      },
    });
    assert.deepEqual(mask, ['f.a', 'f.b.d']);
  });

  it('ignores methods', () => {
    const mask = fieldmask.generateFieldMask({
      f: {
        a: 22,
        b: function () {},
      },
    });
    assert.deepEqual(mask, ['f.a']);
  });

  it('ignores prototype fields', () => {
    class ChildClass {
      constructor(fields) {
        this.fields = fields;
      }
    }

    ChildClass.prototype.z = 1;

    const instance = new ChildClass({
      f: {
        a: 22,
        b: {
          d: 1,
        },
      },
    });

    const mask = fieldmask.generateFieldMask(instance);
    assert.deepEqual(mask, ['fields.f.a', 'fields.f.b.d']);
  });

  it('array', () => {
    const mask = fieldmask.generateFieldMask({
      f: {
        a: ['a', 'b'],
        b: {
          d: 1,
        },
      },
    });
    assert.deepEqual(mask, ['f.a', 'f.b.d']);
  });

  it('null property', () => {
    const mask = fieldmask.generateFieldMask({
      f: {
        a: null,
        b: {
          d: 1,
        },
      },
    });
    assert.deepEqual(mask, ['f.a', 'f.b.d']);
  });

  it('empty object', () => {
    const mask = fieldmask.generateFieldMask({});
    assert.deepEqual(mask, []);
  });

  it('null', () => {
    const mask = fieldmask.generateFieldMask(null);
    assert.deepEqual(mask, []);
  });

  it('undefined', () => {
    const mask = fieldmask.generateFieldMask();
    assert.deepEqual(mask, []);
  });

  it('escaping dots and escape chars in the property name', () => {
    const mask = fieldmask.generateFieldMask({
      f: {
        'b.z': {
          d: 1,
        },
        b: {
          z: {
            d: 1,
          },
        },
        'b\\': {
          x: 1,
        },
      },
    });
    assert.deepEqual(mask, ['f.b\\.z.d', 'f.b.z.d', 'f.b\\\\.x']);
  });
});
