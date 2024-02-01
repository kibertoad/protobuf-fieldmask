const get = require('lodash/get')
const set = require('lodash/set')
const { escapeProperty, unescapeAndSplit } = require('./escaping')

/**
 * Creates a new object that copies fields present in field mask from specified source object
 * @param {*} sourceObject - object to apply field mask to
 * @param {string[]} fieldMask
 * @returns {*} - new object created by applying field mask on source object or original entity if source is not an object
 */
function applyFieldMask(sourceObject, fieldMask) {
  if (!_isObject(sourceObject)) {
    return sourceObject
  }
  const result = {}

  for (let i = 0; i < fieldMask.length; i++) {
    const path = unescapeAndSplit(fieldMask[i])
    const sourceValue = get(sourceObject, path)
    set(result, path, sourceValue)
  }

  return result
}

/**
 * Generates field mask that includes all non-function own properties on specified object
 * @param {*} object - object to generate field mask from
 * @returns {string[]} - generated field mask
 */
function generateFieldMask(object) {
  const paths = []
  if (!_isObject(object)) {
    return paths
  }

  const pathBuilder = ''
  _generatePathForObject(object, pathBuilder, paths)
  return paths
}

function _generatePathForObject(object, path, paths) {
  for (let property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      let expandedPath = path.length > 0 ? path + '.' : path
      expandedPath += escapeProperty(property)

      const objProperty = object[property]

      if (_isDate(object[property])) {
        paths.push(expandedPath)
      }

      if (_isObject(objProperty) && !Array.isArray(objProperty)) {
        _generatePathForObject(objProperty, expandedPath, paths)
      } else if (!_isFunction(objProperty)) {
        paths.push(expandedPath)
      }
    }
  }
}

function _isDate(object) {
  return object instanceof Date && !isNaN(object)
}

function _isObject(object) {
  return typeof object === 'object' && object !== null
}

function _isFunction(object) {
  return typeof object === 'function'
}

module.exports = {
  applyFieldMask,
  generateFieldMask,
}
