/**
 * validates whether input is a valid hexadecimal
 * @param {string} hex
 * @returns {boolean}
 */
export function isHexadecimalString(hex) {
  return /[0-9A-Fa-f]{6}/gi.test(hex);
}
