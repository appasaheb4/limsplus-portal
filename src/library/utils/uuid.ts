export function uuidv4() {
  return "xxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 6) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(6);
  });
}
