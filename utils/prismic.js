import React from 'react'

function asText(richtext, join=' ') {
  return richtext.map(block => block.text).join(join)
}

export {asText}