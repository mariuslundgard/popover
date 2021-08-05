import {getRectCenter} from './getRectCenter'
import {PopoverRect} from './types'

export function getRectDistance(boundary: PopoverRect, position: PopoverRect): number {
  const [x1, y1] = getRectCenter(boundary)
  const [x2, y2] = getRectCenter(position)

  return Math.hypot(x1 - x2, y1 - y2)
}
