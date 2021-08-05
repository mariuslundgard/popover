import {PopoverRect} from './types'

export function getRectCenter(rect: PopoverRect): [number, number] {
  return [rect.x + rect.width / 2, rect.y + rect.height / 2]
}
