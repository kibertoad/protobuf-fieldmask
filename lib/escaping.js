function escapeProperty(propertyName) {
  return propertyName.replace(/\\/g, '\\\\').replace(/\./g, '\\.')
}

function unescapeAndSplit(originalPath) {
  const properties = []
  let path = originalPath
  let i = path.indexOf('.')
  while (i >= 0) {
    if (isEscapedDot(path, i)) {
      path = unescapeFirstDotChar(path)
      // Find the index of the first dot AFTER the one we just unescaped
      i = path.indexOf('.', i)
    } else {
      const firstProperty = path.substring(0, i)
      properties.push(unescapeEscapeChars(firstProperty))
      path = path.substring(i + 1)
      i = path.indexOf('.')
    }
  }

  properties.push(unescapeEscapeChars(path))
  return properties
}

function unescapeFirstDotChar(str) {
  return str.replace('\\.', '.')
}

function unescapeEscapeChars(str) {
  return str.replace(/\\\\/g, '\\')
}

function isEscapedDot(path, i) {
  let counter = 0
  while (path.substring(i - 1, i) === '\\') {
    counter++
    i--
  }

  return counter % 2 === 1
}

module.exports = { escapeProperty, unescapeAndSplit }
