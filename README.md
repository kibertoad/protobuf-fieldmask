# protobuf-fieldmask
Library for generating and applying FieldMask

  [![NPM Version][npm-image]][npm-url]
  [![Linux Build][travis-image]][travis-url]

See https://developers.google.com/protocol-buffers/docs/reference/csharp/class/google/protobuf/well-known-types/field-mask for explanation of what FieldMask is.

## Usage

```
/**
 * Generates field mask that includes all non-function own properties on specified object
 * @param {*} object - object to generate field mask from
 * @returns {string[]} - generated field mask
 */
function generateFieldMask(object)
```

```
/**
 * Creates a new object that copies fields present in field mask from specified source object
 * @param {*} sourceObject - object to apply field mask to
 * @param {string[]} fieldMask
 */
function applyFieldMask(sourceObject, fieldMask)
```

[npm-image]: https://img.shields.io/npm/v/protobuf-fieldmask.svg
[npm-url]: https://npmjs.org/package/protobuf-fieldmask
[travis-image]: https://img.shields.io/travis/kibertoad/protobuf-fieldmask/master.svg?label=linux
[travis-url]: https://travis-ci.org/kibertoad/protobuf-fieldmask
