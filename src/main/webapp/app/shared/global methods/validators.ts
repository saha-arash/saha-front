export function isValidString(value: any): boolean {
  // not equals to null undefined,NaN ,empty string (""), 0, false and "null" string
  if (value && value !== 'null') {
    return true;
  }
  return false;
}

export function appendQuery(url: string, key: string, value: any, isNullAllowed = false): string {
  let urlHolder = url;
  if (isNullAllowed) {
    urlHolder = url + `&${key}=${value}`;
  } else if (isValidString(value)) {
    urlHolder = url + `&${key}=${value}`;
  }
  return urlHolder;
}
