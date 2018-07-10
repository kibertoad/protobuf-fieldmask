# protobuf-fieldmask
Library for generating and applying FieldMask

  [![NPM Version][npm-image]][npm-url]
  [![Linux Build][travis-image]][travis-url]

See https://developers.google.com/protocol-buffers/docs/reference/csharp/class/google/protobuf/well-known-types/field-mask for explanation of what FieldMask is.

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

For an example, running this function with this input:
```
{
  f: {
    a: 22,
    b: {
      d: 1
    }
  }
}
```

generates this output:
```
['f.a', 'f.b.d']
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

For an example, running this function with this input:
```
{
  f: {
    a: 22,
    b: {
      d: 1,
      x: 2
    },
    y: 13
  },
  z: 8
},
['f.a', 'f.b.d']
```

generates this output:
```
{
  f: {
    a: 22,
    b: {
      d: 1
    }
  }
}
```

[npm-image]: https://img.shields.io/npm/v/protobuf-fieldmask.svg
[npm-url]: https://npmjs.org/package/protobuf-fieldmask
[travis-image]: https://img.shields.io/travis/kibertoad/protobuf-fieldmask/master.svg?label=linux
[travis-url]: https://travis-ci.org/kibertoad/protobuf-fieldmask
