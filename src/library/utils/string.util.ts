export const compressString = convertMe => {
  let out = '';
  for (let i = 0; i < convertMe.length; i++) {
    const charCode = convertMe.charCodeAt(i);
    out += String.fromCharCode(Math.trunc(charCode / 256));
    out += String.fromCharCode(charCode % 256);
  }
  return out;
};

export const decompressString = convertMe => {
  let out = '';
  for (let i = 0; i < convertMe.length; i += 2) {
    let charCode = convertMe.charCodeAt(i) * 256;
    charCode += convertMe.charCodeAt(i + 1);
    out += String.fromCharCode(charCode);
  }
  return out;
};
