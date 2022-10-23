export const ensureArray = (x: any, acceptInvalidValue = false) => {
  if (!acceptInvalidValue && [undefined, null, NaN].includes(x)) {
    return x
  }
  return Array.isArray(x) ? x : [x]
}
