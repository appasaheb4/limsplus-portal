/* eslint-disable unicorn/number-literal-case */
export const invertHex = hexcolor => {
  // If a leading # is provided, remove it
  if (hexcolor?.slice(0, 1) === '#') {
    hexcolor = hexcolor?.slice(1);
  }

  // Convert to RGB value
  const r = Number.parseInt(hexcolor?.slice(0, 2), 16);
  const g = Number.parseInt(hexcolor?.slice(2, 4), 16);
  const b = Number.parseInt(hexcolor?.slice(4, 6), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? 'black' : 'white';
};
