export const min = (...args: number[]): number => Math.min(...args)

export const max = (...args: number[]): number => Math.max(...args)

export const constrain = (minValue: number, maxValue: number, value: number): number =>
  max(min(value, maxValue), minValue)
