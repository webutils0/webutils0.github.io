import {
  get,
  chunkString
} from './utils.js'

/**
 * Convert number to base with given options
 * 
 * @param {Number} number - Number to convert
 * @param {Number} base - Desired output base
 * @param {Object} options - Options to apply
 * @param {Number} [options.padding = 8] - Padding to apply to the number 
 * @param {Number} [options.size = 0] - Size to chunk the output string
 * @param {Number} [options.separator = ' '] - Character to separate the chunks with
 * 
 * @returns {string} - String representing the number in the given base
 */
function convert(number, base, options) {
  const padding = get(options, 'padding', 8),
    size = get(options, 'size', 0),
    separator = get(options, 'separator', ' ');
  if (isNaN(padding)) throw "Padding value is not a number!";
  if (isNaN(size)) throw "Chunk size is not a number!";

  let result = number.toString(base).padStart(padding, '0');
  if(size !== 0 && size < result.length) result = chunkString(result, size, true).join(separator);
  if (base === 16) result = '0x' + result;
  return result;
}

console.log(convert(12, 2, {
  padding: 12,
  size: 4,
  separator: '_'
}))

const conversionButton = document.getElementById('conversion-button');
conversionButton.addEventListener('click', e => {
  const textAreas = document.getElementsByTagName('textarea');
  const values = [...textAreas].map(t => t.value);
  console.log(values);
});