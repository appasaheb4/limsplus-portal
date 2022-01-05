import _ from 'lodash'

export function uuidv4(len: number) {
  return _.repeat('x',len ).replace(/[xy]/g, function (c) {
    var r = (Math.random() * len) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(len);
  });
}
