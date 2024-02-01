# protobuf-fieldmask

[![npm version](http://img.shields.io/npm/v/protobuf-fieldmask.svg)](https://npmjs.org/package/protobuf-fieldmask)
[![npm downloads](https://img.shields.io/npm/dm/protobuf-fieldmask.svg)](https://npmjs.org/package/protobuf-fieldmask)
![](https://github.com/kibertoad/protobuf-fieldmask/workflows/unit-tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/kibertoad/protobuf-fieldmask/badge.svg?branch=master)](https://coveralls.io/r/kibertoad/protobuf-fieldmask?branch=master)

Library for generating and applying protobuf [FieldMask](https://developers.google.com/protocol-buffers/docs/reference/csharp/class/google/protobuf/well-known-types/field-mask)

## Usage

### generateFieldMask
```
/**
 * Generates field mask that includes all non-function own properties on specified object
 * @param {*} object - object to generate field mask from
 * @returns {string[]} - generated field mask
 */
function generateFieldMask(object)
```

The name of the properties containing `.` or `\` characters are escaped. 

For an example, running this function with this input:
```
{
  f: {
    a: 22,
    b: {
      d: 1
    },
    'b.d': 33,
    'x\\y': 44
  }
}
```

generates this output:
```
['f.a', 'f.b.d', 'f.b\\.d', "f.x\\\\y"]
```

### applyFieldMask
```
/**
 * Creates a new object that copies fields present in field mask from specified source object
 * @param {*} sourceObject - object to apply field mask to
 * @param {string[]} fieldMask
 * @returns {*} - new object created by applying field mask on source object or original entity if source is not an object
 */
function applyFieldMask(sourceObject, fieldMask)
```

Respects the escaping of the property names in the `fieldMask`.

For an example, running this function with this input:
```
{
  f: {
    a: 22,
    b: {
      d: 1,
      x: 2
    },
    'b.d': 33,
    y: 13
  },
  z: 8
},
['f.a', 'f.b.d', 'f.b\\.d']
```

generates this output:
```
{
  f: {
    a: 22,
    b: {
      d: 1
    },
    'b.d': 33
  }
}
```

Special thanks to Jorge Yero Salazar for providing TS typings!
