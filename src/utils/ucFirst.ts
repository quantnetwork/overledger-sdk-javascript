/**
 * Transform the string first letter to uppercase
 *
 * @param {string} str
 */
function ucFirst(str: string): string {
  if (str.length > 0) {
    return str[0].toUpperCase() + str.substring(1);
  }
  return str;
}

export default ucFirst;
