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
 * Chunk the element into pieces of given size
 * 
 * @param {Array.<*> | string} elem - Array or string to split
 * @param {Number} size - Size of chunks
 * 
 * @returns {string} - Element chunked with separator
 */
function chunk(elem, size) {
  let res = [];
  for (let i = 0, len = elem.length; i < len; i += size) {
    res.push(elem.slice(i, i + size));
  }
  return res;
}

/**
 * Chunk the string into pieces of given size
 * 
 * @param {string} s - String to split
 * @param {Number} size - Size of chunks
 * @param {boolean} reverse - Decide order of chunks
 * 
 * @returns {string} - String chunked
 */
function chunkString(s, size, reverse = false) {
  if (typeof size === "undefined") return s;
  if (reverse) s = s.split('').reverse().join('');
  let res = chunk(s, size);
  if (reverse) res = res.map(x => x.split('').reverse().join('')).reverse();
  return res;
}

/**
 * Return random integer between [min; max[
 * 
 * @param {Number} min - Lower bound (inclusive)
 * @param {Number} max - Upper bound (exclusive)
 * 
 * @returns {Number} - Random number between bounds
 */
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export {
  get,
  chunkString,
  chunk,
  randInt,
};