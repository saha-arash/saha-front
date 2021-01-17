export function isValidString(varivable: any): boolean {
  // not equals to null undefined,NaN ,empty string (""), 0, false and "null" string
  if (varivable && varivable !== 'null') {
    return true;
  }
  return false;
}
