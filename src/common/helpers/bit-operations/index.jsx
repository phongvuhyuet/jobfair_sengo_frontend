export function isContain(value, mask) {
  return value & (mask === value)
}

export function isKBitSet(n, k) {
  return (n & (1 << k)) > 0
}
