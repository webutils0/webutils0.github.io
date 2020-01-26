/**
 * Return the value associated with the given key in object if it exists, otherwise
 * return the default value given as parameter
 * 
 * @param {Object} object - Object to check  
 * @param {string} key - Key associated to wanted value
 * @param {*} default_value  - Default value to return
 * 
 * @returns {*} - Either object[key] or default_value
 */
function get(object, key, default_value) {
  if (typeof object === 'undefined') return default_value;
  return object.hasOwnProperty(key) ? object[key] : default_value;
}

/**
 * Chunk the element into pieces of given size and join the pieces
 * with the given separator
 * 
 * @param {Array.<*> | string} elem - Array or string to split
 * @param {Number} size - Size of chunks
 * 
 * @returns {string} - Element chunked with separator and rejoined
 */
function chunk(elem, size) {
  let res = [];
  for (let i = 0, len = elem.length; i < len; i += size) {
    res.push(elem.slice(i, i + size));
  }
  return res;
}

/**
 * Chunk the string into pieces of given size and join the pieces
 * with the given separator
 * 
 * @param {string} s - String to split
 * @param {Number} size - Size of chunks
 * @param {boolean} reverse - Decide if largest chunk should be left- or rightmost chunk
 * @param {string} separator - Character used to join the chunks
 * 
 * @returns {string} - String chunked with separator and rejoined
 */
function chunkString(s, size, reverse = false, separator = ' ') {
  if (typeof size === "undefined") return s;
  if (reverse) s = s.split('').reverse().join('');
  let res = chunk(s, size);
  if (reverse) res = res.map(x => x.split('').reverse().join('')).reverse();
  return res.join(separator);
}

/**
 * Return random integer between [min; max[
 * 
 * @param {Number} min - Lower bound (inclusive)
 * @param {Number} max - Upper bound (exclusive)
 * 
 * @returns {Number} - Random number between bounds
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export {
  get,
  chunkString,
  chunk
};