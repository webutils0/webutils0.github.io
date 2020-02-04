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

/**
 * Convert hex number to a valid payload of the form \xDE\xAD\xBE\xEF
 * 
 * @param {Number} number - Hexadecimal number
 * @param {Boolean} le - Indicates if using little-endian format
 * 
 * @returns {string} - String like \xDE\xAD\xBE\xEF from 0xdeadbeef
 */
function hex2payload(number, le = true) {
  if (number.startsWith("0x")) number = number.slice(2);
  number = chunkString(number, 2, true);
  if (number[0].length % 2) number[0] = '0' + number[0];
  if (le) number = number.reverse();
  number = number.map(x => "\\x" + x);
  return number.join('');
}

// console.log(convert(12, 2, {
//   padding: 12,
//   size: 4,
//   separator: '_'
// }))

// console.log(hex2payload('0x8007625a'))

const conversionButton = document.getElementById('conversion-button');
conversionButton.addEventListener('click', e => {
  const textAreas = document.getElementsByTagName('textarea');
  const values = [...textAreas].map(t => t.value);
  // console.log(values);
});

const tempButton = document.getElementById('temp-button');
tempButton.addEventListener('click', e => {
  const inp = document.getElementById("in");
  const out = document.getElementById("out");
  const check = document.getElementById("endian-checkbox");
  try {
    out.value = hex2payload(inp.value.trim(), check.checked);
  } catch (error) {
    console.log(error);
  }
});