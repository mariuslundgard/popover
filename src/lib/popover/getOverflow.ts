import {PopoverRect, PopoverPosition} from './types'

export function getOverflow(boundary: PopoverRect, position: PopoverRect): PopoverPosition {
  const right = position.x + position.width - (boundary.x + boundary.width)
  const bottom = position.y + position.height - (boundary.y + boundary.height)

  return {
    top: boundary.y - position.y,
    left: boundary.x - position.x,
    right,
    bottom,
  }
}
