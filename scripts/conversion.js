import { get, chunkString } from './utils.js'

/**
 * Convert number to base with given options
 * 
 * @param {Number} number -  
 * @param {Number} base 
 * @param {Object} options 
 */
function convert(number, base, options) {
  const padding = get(options, 'padding', 8),
    size = get(options, 'size', 0),
    separator = get(options, 'separator', ' ');
  if (isNaN(padding)) throw "Padding value is not a number!";
  if (isNaN(size)) throw "Chunk size is not a number!";
  
  let result = number.toString(base).padStart(padding, '0');
  if (size === 0 || size >= result.length) return result;
  return chunkString(result, size, separator);
}

console.log(convert(12, 2, {
  padding: 16,
  size: 4,
  separator: '-'
}))