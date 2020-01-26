function get(object, param, default_value) {
  if (typeof object === 'undefined') return default_value;
  return object.hasOwnProperty(param) ? object[param] : default_value;
}

function chunkString(s, size, separator = ' ') {
  if (typeof size === "undefined") return s;
  let res = [];
  for (let i = 0, len = s.length; i < len; i += size) {
    res.push(s.slice(i, i + size));
  }
  return res.join(separator);
}

export { get, chunkString };